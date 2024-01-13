export interface IEmployee {
  id: number;
  dateOfBirth: Date;
  firstName: string;
  gender: string;
  lastName: string;
  middleName: string;
  salary: number;
  classOdd?: string;
  isOdd?: boolean;
  fullName: string;
}
