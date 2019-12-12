import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // @Get()
    // getHello(): string {
    //     return this.appService.getHello();
    // }

    // CRUD Operations
    // 1. Create form definition (form should be stored in firestore database)
    // 2. Update form definition
    // 3. Delete form definition
    // 4. Provided with a service name, return the form definition
    // 5. Implement some form of server side validation and storage of form submission
}
