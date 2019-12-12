import {Body, Controller, InternalServerErrorException, Post, UsePipes} from '@nestjs/common';
import {FormSubmissionDto} from './form-submission.dto';
import {FormSubmissionService} from './form-submission.service';
import {ValidateSchemaPipe} from '../validation/validate-schema';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class FormSubmissionController {
    constructor(private formSubmissionService: FormSubmissionService) {
    }

    @MessagePattern('addformsubmission')
    @UsePipes(new ValidateSchemaPipe(FormSubmissionDto))
    async submitForm(@Body() fromSubmission: FormSubmissionDto) {
        try {
            const result = await this.formSubmissionService.submitForm(fromSubmission);
            return {...result};
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

}
