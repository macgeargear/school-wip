import { IClassroom } from "../entities/index";
import { PrismaClient } from "@prisma/client";
import { IRepositoryClassroom } from "../interface/classroom";

export function newReposityClassroom(db: PrismaClient): IRepositoryClassroom {
  return new RepositoryClassroom(db);
}

class RepositoryClassroom implements IRepositoryClassroom {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createClassroom(name: string): Promise<IClassroom> {
    return this.db.classroom.create({
      data: { name },
    });
  }

  async getClassrooms(): Promise<IClassroom[]> {
    return this.db.classroom.findMany();
  }
}
