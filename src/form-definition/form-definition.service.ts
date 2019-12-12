import {ConflictException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {FormDefinition} from './form-definition.dto';
import database from '../database/database';

import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';

@Injectable()
export class FormDefinitionService {

    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8877,
            }
        })
    }

    fromDefinitions: FormDefinition[] = [];
    private logger = new Logger('FormDefinitionService');
    formDefinitionCollection = 'formdefinitions';

    // Create new Form definition
    async addFormDefinition(formDefinition) {

        const newFormDefinition = new FormDefinition();

        const service = Object.keys(formDefinition)[0];
        newFormDefinition.service = service;
        newFormDefinition.keyArray = [];
        formDefinition[service].forEach((item) => {
            newFormDefinition.keyArray.push(item);
        });

        // Check to ensure service doesn't already exists (service is unique)
        try {
            const serviceDoc = await database.collection(this.formDefinitionCollection).doc(service).get();
            if (serviceDoc.exists) {
                throw new ConflictException('Service already exists');
            } else {
                // Make new database entry to FireStore as JSON object
                const formDefinitionRef = database.collection(this.formDefinitionCollection).doc('magician');
                try {
                    return await formDefinitionRef.set(JSON.parse(JSON.stringify(newFormDefinition)));
                } catch (e) {
                    throw new InternalServerErrorException();
                }
            }
        } catch {
            throw new InternalServerErrorException();
        }

    }

    // Create new Form definition
    // async addFormDefinition(formDefinition: FormDefinition) {
    //     this.logger.log('Sending request to Form definition microservice')
    //     return this.client.send('addformdefinition', formDefinition)
    // }

    // Read Form definition by service name
    async getFormDefinition(service: string) {
        // Read a document from database
        try {
            return await database.collection(this.formDefinitionCollection).doc(service).get();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    // Delete Form definition by service name
    async deleteFormDefinition(service: string) {
        try {
            return await database.collection(this.formDefinitionCollection).doc(service).delete();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    // Update Form definition
    async updateFormDefinition(service, formDefinition) {
        try {
            return await database.collection(this.formDefinitionCollection).doc(service).update(formDefinition);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
