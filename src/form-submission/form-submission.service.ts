import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import database from '../database/database';
import {Logger} from '@nestjs/common';

@Injectable()
export class FormSubmissionService {
    formSubmissionCollection = 'formsubmissions';
    formDefinitionCollection = 'formdefinition';

    private logger = new Logger('FormSubmissionService');

    async submitForm(formSubmission) {
        try {
            // Using the service key, get the service document
            const serviceDocument = await database.collection(this.formDefinitionCollection).doc(formSubmission.serviceKey).get();
            if (serviceDocument.exists) {
                // Using the key from the form submission, get the appropriate question
                const serviceRecords = serviceDocument.data();
                serviceRecords.KeyArray.forEach((keyInformation) => {
                    if (keyInformation.key === formSubmission.key) {
                        // Check if question is required
                        if (keyInformation.validation.required) {
                            // Loop through the questions array in the form submission and ensure they contain values
                            // If any questions is missing then validation has failed
                            formSubmission.questions.forEach(question => {
                                if (!question.value) {
                                    throw new BadRequestException({
                                        message: keyInformation.validation.validationMessage ? keyInformation.validation.validationMessage : 'Validation failed, required field missing',
                                    });
                                }

                                // Check if maxlength is appropriate
                                if (keyInformation.validation.maxLength && (question.value.length > keyInformation.validation.maxLength)) {
                                    throw new BadRequestException({
                                        message: `Validation failed, exceeded max length: ${keyInformation.validation.maxLength}`,
                                    });
                                }

                            });
                        }
                    }
                });

                // Store form entry into Firestore once validation is successful
                try {
                    const saveFormSubmission = await database.collection(this.formSubmissionCollection).add(formSubmission);
                    if (saveFormSubmission) {
                        return {
                            status: 200,
                        };
                    }
                } catch {
                    throw new InternalServerErrorException('Could not save form submission');
                }

            } else {
                // Return error if no document is found
                return {
                    status: 404,
                    message: 'Document not found',
                };
            }

        } catch (e) {
            throw new InternalServerErrorException(e);
        }
        return {};
    }
}
