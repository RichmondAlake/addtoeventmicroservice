import {Module} from '@nestjs/common';
import {FormDefinitionController} from './form-definition.controller';
import {FormDefinitionService} from './form-definition.service';

@Module({
    controllers: [FormDefinitionController],
    providers: [FormDefinitionService],
})
export class FormDefinitionModule {}
