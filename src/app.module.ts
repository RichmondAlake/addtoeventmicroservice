import {Module} from '@nestjs/common';
import {FormDefinitionModule} from './form-definition/form-definition.module';
import {FormSubmissionModule} from './form-submission/form-submission.module';

@Module({
    imports: [FormDefinitionModule, FormSubmissionModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
