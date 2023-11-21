import { Injectable } from '@angular/core';
import User from "../interfaces/user.interface";
import {users} from "../mocks/userList.mock";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
userList: User[] = users
  constructor() { }

  loadUsers():Promise<User[]>{
    return new Promise((resolve) => {
      // Realiza una operación asíncrona que devuelve un array
      const array = this.userList;

      // Resuelve la promesa con el array
      resolve(array);
    });
  }
}
