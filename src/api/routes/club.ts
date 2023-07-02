import { HandlerFunc } from "../app";
import { Router } from "./router";

export interface IHandlerClub {
  createClub: HandlerFunc;
  addStudent: HandlerFunc;
  deleteClub: HandlerFunc;
}

export class RouterClub extends Router {
  constructor(handler: IHandlerClub) {
    super();

    this.router().post("/", handler.createClub.bind(handler));
    this.router().post("/add-student", handler.addStudent.bind(handler));
    this.router().delete("/", handler.deleteClub.bind(handler));
  }
}
