import { IWorker } from "./iworker";

export interface IUser
{
   
    // Роль
    role:string;
    // Дозволи
    permissions:string[];
    // Користувачі
    users:IWorker[]
}