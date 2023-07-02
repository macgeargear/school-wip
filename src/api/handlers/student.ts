import { IRepositoryStudent } from "../../domain/interface/student";
import resp from "../reponse";
import { Request, Response } from "express";
import { IHandlerStudent } from "../routes/student";

export class HandlerStudent implements IHandlerStudent {
  private repo: IRepositoryStudent;

  constructor(repo: IRepositoryStudent) {
    this.repo = repo;
  }

  async createStudent(req: Request, res: Response): Promise<Response> {
    const { name, classroomId, clubsIds } = req.body;
    if (!name) return resp.MissingField(res, "name");
    if (!classroomId) return resp.MissingField(res, "classroomId");

    return this.repo
      .createStudent({ name, classroomId, clubsIds })
      .then((student) =>
        resp.Created(res, {
          id: student.id,
          name: student.name,
          classroomId: student.classroomId,
        })
      )
      .catch((err) => {
        console.error(`failed to create user ${name}: ${err}`);
        return resp.InternalServerError(res, "failed to create student");
      });
  }

  async getStudents(req: Request, res: Response): Promise<Response> {
    return this.repo.getStudents().then((students) => {
      return resp
        .Ok(res, students)
        .then((students) => {
          return resp.Ok(res, students);
        })
        .catch((err) => {
          console.error(`failed to get students: ${err}`);
          return resp.InternalServerError(res, "failed to get students");
        });
    });
  }

  async getStudentById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return resp.InternalServerError(res, "id is not a number");
    }

    return this.repo
      .getStudentById(id)
      .then((student) => {
        return resp.Ok(res, student);
      })
      .catch((err) => {
        console.error(`failed to get student: ${err}`);
        return resp.InternalServerError(res, `failed to get student: ${id}`);
      });
  }

  async getStudentByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    if (!name) {
      return resp.MissingField(res, name);
    }

    return this.repo
      .getStudentByName(name)
      .then((student) => {
        return resp.Ok(res, student);
      })
      .catch((err) => {
        console.error(`failed to get student: ${err}`);
        return resp.InternalServerError(res, `failed to get student: ${name}`);
      });
  }
  async deleteStudentById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return resp.InternalServerError(res, "id is not a number");
    }

    return this.repo
      .deleteStudentById(id)
      .then((student) => {
        return resp.Ok(res, student);
      })
      .catch((err) => {
        console.error(`failed to delete student: ${err}`);
        return resp.InternalServerError(res, `failed to delete student: ${id}`);
      });
  }
  async setClubs(req: Request, res: Response): Promise<Response> {
    const { id, clubsIds } = req.body;
    if (!id) return resp.MissingField(res, "id");
    if (!clubsIds) return resp.MissingField(res, "club id");

    return this.repo
      .setClubs(id, clubsIds)
      .then((student) => {
        return resp.Ok(res, student);
      })
      .catch((err) => {
        console.error(`failed to set student's clubs: ${err}`);
        return resp.InternalServerError(
          res,
          `failed to  set student's clubs: ${id}`
        );
      });
  }

  async joinClubs(req: Request, res: Response): Promise<Response> {
    const { id, clubsIds } = req.body;
    if (!id) return resp.MissingField(res, "id");
    if (!clubsIds) return resp.MissingField(res, "club id");

    return this.repo
      .joinClubs(id, clubsIds)
      .then((student) => {
        return resp.Ok(res, student);
      })
      .catch((err) => {
        console.error(`failed to club clubs ${clubsIds}: ${err}`);
        return resp.InternalServerError(
          res,
          `failed to join clubs ${clubsIds}: ${id}`
        );
      });
  }
}
