import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserRegister } from '../../shared/interfaces/UsuarioRegistrado';
import { UserService } from '../../core/service/user.service';

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
    console.log('Datos del formulario:', this.user);


    if (this.user.password !== this.user.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    this.userService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso!', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro', err);
      }
    });

  }
}
