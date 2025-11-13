import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../shared/interfaces/User';
import { UserUpdateRequest } from '../../../shared/interfaces/UserUpdateRequest';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditProfileComponent implements OnInit {

  editableUser: User | null = null;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.editableUser = { ...currentUser };
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (!this.editableUser) return;
    this.errorMessage = null;

    const updatePayload: UserUpdateRequest = {
      name: this.editableUser.name,
      surname: this.editableUser.surname,
      address: this.editableUser.address,
      phone: this.editableUser.phone,
      photo: this.editableUser.photo
    };

    this.userService.updateUser(this.editableUser.userId, updatePayload).subscribe({
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
