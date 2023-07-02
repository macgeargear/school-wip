import { IRepositoryClub } from "../../domain/interface/club";
import resp from "../reponse";
import { Request, Response } from "express";

class HandlerClub {
  private repo: IRepositoryClub;

  constructor(repo: IRepositoryClub) {
    this.repo = repo;
  }

  async createClub(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    if (!name) return resp.MissingField(res, "name");

    return this.repo
      .createClub(name)
      .then((club) => {
        return resp.Created(res, club);
      })
      .catch((err) => {
        console.error(`failed to create club ${name}: ${err}`);
        return resp.InternalServerError(res, "failed to create club");
      });
  }

  async addStudent(req: Request, res: Response): Promise<Response> {
    const { clubId, studentsIds } = req.body;
    if (!clubId) return resp.MissingField(res, "Club id");
    if (!studentsIds) return resp.MissingField(res, "students ids");

    return this.repo
      .addStudent(clubId, studentsIds)
      .then((club) => {
        return resp.Ok(res, club);
      })
      .catch((err) => {
        console.error(`failed to add student to club ${clubId}: ${err}`);
        return resp.InternalServerError(
          res,
          `failed to add students to club: ${clubId}`
        );
      });
  }

  async deleteClub(req: Request, res: Response): Promise<Response> {
    if (!req.params.id) return resp.MissingPrarm(res, "id");

    const id = Number(req.params.id);
    if (isNaN(id)) return resp.InternalServerError(res, "id is not number");

    return this.repo
      .deleteClub(id)
      .then((club) => {
        return resp.Ok(res, club);
      })
      .catch((err) => {
        console.error(`failed to delete club ${id}: ${err}`);
        return resp.InternalServerError(res, "failed to delete club");
      });
  }
}
