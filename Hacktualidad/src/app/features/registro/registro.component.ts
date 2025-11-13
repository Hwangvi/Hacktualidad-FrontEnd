import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserRegister } from '../../shared/interfaces/UsuarioRegistrado';
import { UserService } from '../../core/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegistroComponent implements OnInit {

  public user: UserRegister = {
    name: '',
    surname: '',
    address: '',
    phone: null,
    photo: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  public onSubmit(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.showErrorAlert('Las contraseñas no coinciden. Por favor, verifica.');
      return;
    }

    this.userService.register(this.user).subscribe({
      next: (response) => {
        this.showSuccessAlert();
      },
      error: (err) => {
        const errorMessage = err.error || 'No se pudo completar el registro. Inténtalo de nuevo.';
        this.showErrorAlert(errorMessage);
      }
    });

  }

  showSuccessAlert() {
    Swal.fire({
      title: '¡REGISTRO COMPLETADO!',
      text: 'Tu cuenta ha sido creada. Serás redirigido a la página de login.',
      icon: 'success',
      timer: 3500,
      timerProgressBar: true,
      background: '#0a0a0a',
      color: '#00ff00',
      confirmButtonText: '[ CONTINUAR ]',
      customClass: {
        popup: 'hacker-popup',
        title: 'hacker-title',
        confirmButton: 'hacker-confirm-button'
      }
    }).then((result) => {
      this.router.navigate(['/login']);
    });
  }

  showErrorAlert(message: string) {
    Swal.fire({
      title: 'ERROR EN EL REGISTRO',
      text: message,
      icon: 'error',
      background: '#0a0a0a',
      color: '#ff3333',
      confirmButtonText: '[ ENTENDIDO ]',
      customClass: {
        popup: 'hacker-popup',
        title: 'hacker-title',
        confirmButton: 'hacker-error-button'
      }
    });
  }
}
