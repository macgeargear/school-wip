export interface ICreateStudent {
  name: string;
  classroomId: number;
  clubsIds?: number[];
}

export interface ICreateClassroom {
  name: string;
}

export interface ICreateClub {
  name: string;
}

export interface IStudent {
  id: number;
  name: string;
  classroomId: number;
}

export interface IClassroom {
  id: number;
  name: string;
}

export interface IClub {
  id: number;
  name: string;
}

export interface IStudentWithClassroom extends IStudent {
  classroom: IClassroom;
}

export interface IStudentFull extends IStudentWithClassroom {
  clubs?: IClub[];
}

export interface IClubWithStudent extends IClub {
  students: IStudentWithClassroom[];
}
