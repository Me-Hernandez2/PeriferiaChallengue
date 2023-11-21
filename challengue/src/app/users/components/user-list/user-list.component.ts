import { Component } from '@angular/core';
import User from "../../interfaces/user.interface";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  users: User[] = []

  constructor() {
    // This constructor can be used to initialize any properties or dependencies of the component.
  }

  ngOnInit(): void {

  }
}
