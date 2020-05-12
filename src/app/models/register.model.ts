import { Course } from './course.model';
import { Student } from './student.model';

export class Register {
    public id: string;
    public status: string;
    public is_active: boolean;
    public student_id: Student;
    public course_id: Course;
}
