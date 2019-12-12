import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    Get,
    Param,
    Patch,
    Logger,
    NotFoundException,
    Delete,
} from '@nestjs/common';
import {FormDefinitionService} from './form-definition.service';
import {FormDefinition} from './form-definition.dto';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class FormDefinitionController {
    private logger = new Logger('FormDefinitionController');

    constructor(private readonly formDefinitionService: FormDefinitionService,
    ) {
    }

    @MessagePattern('addformdefinition')
    async addFormDefinition(formDefinition: FormDefinition) {
        try {
            this.logger.log('Saving new Form Definition');
            const result = await this.formDefinitionService.addFormDefinition(formDefinition);
            if (result) {
                return {status: 200};
            }
        } catch (e) {
            this.logger.log(e);
            throw new InternalServerErrorException();
        }
    }

    @MessagePattern('getformdefinition')
    async getFormDefinition(@Param('service') service: string) {
        try {
            const formDefinition = await this.formDefinitionService.getFormDefinition(service);

            if (formDefinition.exists) {
                return {
                    status: 200,
                    content: formDefinition.data(),
                };
            } else {
                throw new NotFoundException();
            }
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @MessagePattern('deleteformdefinition')
    async deleteFormDefinition(@Param('service') service: string) {
        try {
            await this.formDefinitionService.deleteFormDefinition(service);
            return {
                status: 200,
            };
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @MessagePattern('updateformdefinition')
    async updateFormDefinition(
        @Param('service') service: string,
        @Body() formDefinition: FormDefinition,
    ) {
        try {
            const result = await this.formDefinitionService.updateFormDefinition(service, formDefinition);
            return {...result};
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

}
