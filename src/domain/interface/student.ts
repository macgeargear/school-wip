import { ICreateStudent, IStudent } from "../entities";

export interface IRepositoryStudent {
  createStudent(args: ICreateStudent): Promise<IStudent>;
  getStudents(): Promise<IStudent[]>;
  getStudentById(id: number): Promise<IStudent | null>;
  getStudentByName(name: string): Promise<IStudent | null>;
  deleteStudentById(id: number): Promise<IStudent>;
  setClubs(id: number, clubsIds: number[]): Promise<IStudent | null>;
  joinClubs(id: number, clubsIds: number[]): Promise<IStudent | null>;
}
