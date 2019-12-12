import {IsString, IsInt, IsIn, IsArray, IsDate} from 'class-validator';

export class FormSubmissionDto {
    @IsString()
    key: string;

    @IsString()
    name: string;

    @IsInt()
    date: number;

    @IsString()
    serviceKey: string;

    @IsArray()
    questions: QuestionsInterface[];

    value: any;

    @IsDate()
    dataCreated: number;
}

interface QuestionsInterface {
    questionKey: number;
    value: any;
}
