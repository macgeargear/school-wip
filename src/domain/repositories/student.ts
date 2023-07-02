import { PrismaClient } from "@prisma/client";
import { ICreateStudent, IStudent } from "../entities";
import { IRepositoryStudent } from "../interface/student";

export function newRepositoryStudent(db: PrismaClient): IRepositoryStudent {
  return new RepositoryStudent(db);
}

class RepositoryStudent implements IRepositoryStudent {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createStudent(args: ICreateStudent): Promise<IStudent> {
    return this.db.student.create({
      data: {
        name: args.name,
        classroom: {
          connect: { id: args.classroomId },
        },
        clubs: {
          connect: args.clubsIds?.map((clubId) => {
            return { id: clubId };
          }),
        },
      },
    });
  }

  async getStudents(): Promise<IStudent[]> {
    return this.db.student.findMany();
  }

  async getStudentById(id: number): Promise<IStudent | null> {
    return this.db.student.findUnique({
      where: { id },
      include: {
        classroom: true,
        clubs: true,
      },
    });
  }

  async getStudentByName(name: string): Promise<IStudent | null> {
    return this.db.student.findFirst({
      where: { name },
    });
  }

  async deleteStudentById(id: number): Promise<IStudent> {
    return this.db.student.delete({
      where: { id },
    });
  }

  async setClubs(id: number, clubsIds: number[]): Promise<IStudent | null> {
    return this.db.student.update({
      where: { id },
      data: {
        clubs: {
          set: clubsIds.map((clubId) => {
            return { id: clubId };
          }),
        },
      },
    });
  }

  async joinClubs(id: number, clubsIds: number[]): Promise<IStudent | null> {
    return this.db.student.update({
      where: { id },
      data: {
        clubs: {
          connect: clubsIds.map((id) => {
            return { id };
          }),
        },
      },
    });
  }
}
