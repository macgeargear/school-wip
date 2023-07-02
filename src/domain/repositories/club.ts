import { PrismaClient } from "@prisma/client";
import { IClub } from "../entities";
import { IRepositoryClub } from "../interface/club";

export function newRepositoryClub(db: PrismaClient): IRepositoryClub {
  return new RepositoryClub(db);
}

class RepositoryClub implements IRepositoryClub {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createClub(name: string): Promise<IClub> {
    return this.db.club.create({
      data: { name },
    });
  }

  async getClubs(): Promise<IClub[]> {
    return this.db.club.findMany();
  }

  async addStudent(clubId: number, studentsIds: number[]): Promise<IClub> {
    return this.db.club.update({
      where: { id: clubId },
      data: {
        students: {
          connect: studentsIds.map((studentId) => {
            return { id: studentId };
          }),
        },
      },
    });
  }

  async deleteClub(id: number): Promise<IClub> {
    return this.db.club.delete({
      where: { id },
    });
  }
}
