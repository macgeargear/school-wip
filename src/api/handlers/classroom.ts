import { IRepositoryClassroom } from "../../domain/interface/classroom";
import { Request, Response } from "express";
import resp from "../reponse";

class HandlerClassroom {
  private repo: IRepositoryClassroom;

  constructor(repo: IRepositoryClassroom) {
    this.repo = repo;
  }

  async createClassroom(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    if (!name) return resp.MissingField(res, "name");

    return this.repo
      .createClassroom(name)
      .then((classroom) => {
        return resp.Created(res, classroom);
      })
      .catch((err) => {
        console.error(`failed to create classroom ${name}: ${err}`);
        return resp.InternalServerError(res, "failed to create classroom");
      });
  }

  async getClassroom(req: Request, res: Response): Promise<Response> {
    return this.repo
      .getClassrooms()
      .then((classrooms) => {
        return resp.Ok(res, classrooms);
      })
      .catch((err) => {
        console.error(`failed to get classrooms: ${err}`);
        return resp.InternalServerError(res, "failed to get classrooms");
      });
  }
}
