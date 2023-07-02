import { HandlerFunc } from "../app";
import { Router } from "./router";

export interface IHandlerStudent {
  createStudent: HandlerFunc;
  getStudents: HandlerFunc;
  getStudentById: HandlerFunc;
  getStudentByName: HandlerFunc;
  deleteStudentById: HandlerFunc;
  setClubs: HandlerFunc;
  joinClubs: HandlerFunc;
}

export class RouterStudent extends Router {
  constructor(handler: IHandlerStudent) {
    super();

    this.router().post("/", handler.createStudent.bind(handler));
    this.router().get("/", handler.getStudents).bind(handler);
    this.router().get("/:id", handler.getStudentById).bind(handler);
    this.router().get("/name", handler.getStudentByName.bind(handler));
    this.router().delete("/:id", handler.deleteStudentById.bind(handler));
    this.router().post("/set-club", handler.setClubs.bind(handler));
    this.router().post("/join-club", handler.joinClubs.bind(handler));
  }
}
