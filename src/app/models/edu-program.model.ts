import { Teacher } from './../models/teacher.model';

export class EduProgram {
    public id: string;
    public name: string;
    // tslint:disable-next-line: variable-name
    public teacher_id: Teacher;
    public fee: number;
}
