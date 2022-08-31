import { IPhone } from "./iphone";

export interface ICustomer {
    id: string;
    corporateName: string;
    birthDate: Date;
    Phone: IPhone[];
  }