import { EduProgram } from './edu-program.model';
import { Teacher } from './teacher.model';

export class Subject {
    public id: string;
    public name: string;
    public credit: number;
    public teacher_id: Teacher;
    public program_id: EduProgram;
}
