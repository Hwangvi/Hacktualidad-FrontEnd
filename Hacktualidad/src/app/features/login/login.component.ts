import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        if (response.role === 'ADMIN') {
          this.router.navigate(['/profile/admin']);
        } else {
          this.router.navigate(['/profile/user']);
        }
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
