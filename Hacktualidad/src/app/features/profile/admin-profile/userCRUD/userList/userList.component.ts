import { User } from './../../../../../shared/interfaces/User';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../core/service/user.service';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {

  private refreshTrigger$ = new Subject<void>();
  users$!: Observable<User[]>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.refreshTrigger$.pipe(
      startWith(undefined),
      switchMap(() => this.userService.getUsers())
    );
  }

  loadUsers(): void {
    this.refreshTrigger$.next();
  }

  onDeleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El usuario ha sido borrado.', 'success');
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al borrar el usuario:', err);
            Swal.fire('Error', 'No se pudo borrar el usuario. Inténtalo de nuevo.', 'error');
          }
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/profile/admin']);
  }
}
