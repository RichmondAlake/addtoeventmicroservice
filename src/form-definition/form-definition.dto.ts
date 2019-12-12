export class FormDefinition {
    service: string;
    keyArray: KeyInterface[];
}

interface KeyInterface {
    key: string;
    type: string;
    title: string;
    placeholder: string;
    options?: (OptionsInterface)[];
    validation: ValidationInterface;
}

interface OptionsInterface {
    name: string;
    value: string;
}

interface ValidationInterface {
    required: boolean;
    maxLength: number;
    pattern: string;
    validationMessage: string;
}
