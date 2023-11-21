import { Component } from '@angular/core';
import User from "../../interfaces/user.interface";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  users: User[] = []
  backupUserList: User[] = [];
  time = 0;

  // Término de búsqueda
  searchTerm: string = '';

  constructor(private userService$: UsersService) {
    // This constructor can be used to initialize any properties or dependencies of the component.
  }

  ngOnInit(): void {
  this.getUsers();
  }

  getUsers(){
    this.userService$.loadUsers().then((response) => {
       this.users = response
      this.backupUserList = [...this.users]
      }
    )
  }

  filterProducts() {
    if (this.searchTerm) {
      // Convertir el término de búsqueda a minúsculas para una búsqueda sin distinción entre mayúsculas y minúsculas
      const searchTermLower = this.searchTerm.toLowerCase();
      // Aplicar filtro a los datos originales
      this.users = this.backupUserList.filter(product =>
        // Comprueba si alguna columna contiene el término de búsqueda
        Object.values(product).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTermLower);
          }
          return false; // No se aplica la búsqueda a valores no-strings
        }));
    } else {
      // Si el término de búsqueda está vacío, restaurar los datos originales
      this.users = [...this.backupUserList];
    }
  }

  reloadUsers(){
    this.users = [];
    this.backupUserList = [];
    this.time = 3
    this.showCountdown(this.time)
    setTimeout(()=>{
      this.getUsers()
    }, 3000)
  }

  showCountdown(time: number) {
    // Inicializa la variable de tiempo
    let seconds = time;

    // Crea una función de temporizador
    const timer = setInterval(() => {
      // Decrementa el tiempo
      seconds--;

      // Actualiza la variable time
      this.time = seconds;

      // Si el tiempo ha terminado, detiene el temporizador
      if (seconds <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
}
