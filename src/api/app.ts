import express, { Request, Response } from "express";
import { IHandlerStudent, RouterStudent } from "./routes/student";
import resp from "./reponse";
import { IHandlerClassroom, RouterClassroom } from "./routes/classroom";
import { IHandlerClub, RouterClub } from "./routes/club";

// Handlers that do not require authentication middleware
export type HandlerFunc = (
  Request: Request,
  Response: Response
) => Promise<Response>;

export interface ArgCreateApp {
  student: IHandlerStudent;
  classroom: IHandlerClassroom;
  club: IHandlerClub;
}

export class App {
  private readonly _server: express.Express;

  constructor(args: ArgCreateApp) {
    this._server = express();
    this._server.use(express.json());
    this._server.get("/status", (_req: Request, res: Response) => {
      return resp.Ok(res, "Ok ja");
    });

    this._server.use("/student", new RouterStudent(args.student).router());
    this._server.use(
      "/classroom",
      new RouterClassroom(args.classroom).router()
    );
    this._server.use("/club", new RouterClub(args.club).router());
  }

  async listenAndServe(port: number | string): Promise<void> {
    const server = this._server.listen(port, () => {
      console.log(`Express server is listening on port ${port}`);
    });
  }
}
