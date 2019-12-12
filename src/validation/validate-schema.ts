import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';

@Injectable()
export class ValidateSchemaPipe implements PipeTransform {
    // tslint:disable-next-line:ban-types
    constructor(private readonly schema: Object) {
    }

    transform(value: any, metadata: ArgumentMetadata): any {
        // @ts-ignore
        const {error} = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation of schema failed');
        }

        return value;
    }
}
