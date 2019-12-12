import {Module} from '@nestjs/common';
import {FormSubmissionService} from './form-submission.service';
import {FormSubmissionController} from './form-submission.controller';

@Module({
    imports: [],
    providers: [FormSubmissionService],
    controllers: [FormSubmissionController],
})
export class FormSubmissionModule {}
