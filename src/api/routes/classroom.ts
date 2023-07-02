import { HandlerFunc } from "../app";
import { IHandlerClub } from "./club";
import { Router } from "./router";

export interface IHandlerClassroom {
  createClassroom: HandlerFunc;
  getClassroom: HandlerFunc;
}

export class RouterClassroom extends Router {
  constructor(handler: IHandlerClassroom) {
    super();

    this.router().post("/", handler.createClassroom.bind(handler));
    this.router().get("/", handler.getClassroom.bind(handler));
  }
}
