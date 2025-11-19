import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from '../../../../../core/service/forum.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topic-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './topicCreate.component.html',
  styleUrls: ['./topicCreate.component.css']
})
export class TopicCreateComponent {
  topicForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forumService: ForumService
  ) {
    this.topicForm = this.fb.group({
      topicName: ['', [Validators.required, Validators.minLength(3)]],
      topicDescription: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.topicForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, rellena todos los campos requeridos.',
        background: '#0a110a',
        color: '#9affb4',
        confirmButtonColor: '#008f26'
      });
      return;
    }

    this.isSubmitting = true;

    this.forumService.createTopic(this.topicForm.value).subscribe({
      next: (nuevaTematica) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: '¡Temática Creada!',
          text: `La temática "${nuevaTematica.topicName}" se ha creado correctamente.`,
          timer: 2000,
          timerProgressBar: true,
          background: '#0a110a',
          color: '#9affb4',
        }).then(() => {
          this.topicForm.reset();
          this.router.navigate(['/forum']);
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: '¡Oops... Hubo un error!',
          text: 'No se pudo crear la temática. Por favor, inténtalo de nuevo más tarde.',
          background: '#0a110a',
          color: '#9affb4',
          confirmButtonColor: '#ff3333'
        });
        console.error('Error al crear la temática:', err);
      }
    });
  }
}
