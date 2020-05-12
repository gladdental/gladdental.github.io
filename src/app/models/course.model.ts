import { EduProgram } from './edu-program.model';

export class Course {
    public id: number;
    public fee: number;
    public start_year: string;
    public end_year: string;
    public program_id: EduProgram;
}
