import { IClub } from "../entities";

export interface IRepositoryClub {
  createClub(name: string): Promise<IClub>;
  addStudent(clubId: number, studentsIds: number[]): Promise<IClub>;
  deleteClub(id: number): Promise<IClub>;
}
