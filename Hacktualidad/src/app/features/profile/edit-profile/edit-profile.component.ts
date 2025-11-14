
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../shared/interfaces/User';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditProfileComponent implements OnInit {

  editableUser: User | null = null;
  errorMessage: string | null = null;

  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.editableUser = { ...currentUser };
      if (this.editableUser.photo) {
        this.imagePreview = 'http://localhost:8080/uploads/' + this.editableUser.photo;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = file; // Guardamos el archivo para enviarlo en onSubmit

      // --- LÓGICA PARA LA PREVISUALIZACIÓN INSTANTÁNEA ---
      // 1. Crear un lector de ficheros del navegador
      const reader = new FileReader();

      // 2. Definir qué hacer cuando el fichero se haya leído por completo
      reader.onload = () => {
        // Asignamos el resultado de la lectura a nuestra variable de previsualización
        this.imagePreview = reader.result;
      };

      // 3. Iniciar la lectura del fichero. Cuando termine, se ejecutará el 'onload'
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (!this.editableUser) return;
    this.errorMessage = null;

    const userUpdateData = {
      name: this.editableUser.name,
      surname: this.editableUser.surname,
      address: this.editableUser.address,
      phone: this.editableUser.phone,
    };


    const formData = new FormData();
    formData.append('user', JSON.stringify(userUpdateData));

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.userService.updateUser(this.editableUser.userId, formData).subscribe({
      next: (updatedUser: User) => {
        this.authService.updateCurrentUser(updatedUser);
        this.router.navigate(['/profile/user'], { queryParams: { updated: 'true' } });
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.errorMessage = 'No se pudo actualizar el perfil. Inténtalo de nuevo.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/profile/user']);
  }
}
