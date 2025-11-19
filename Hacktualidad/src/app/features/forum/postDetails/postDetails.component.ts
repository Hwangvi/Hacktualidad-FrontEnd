import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ForumService } from '../../../core/service/forum.service';
import { Post } from '../../../shared/interfaces/forum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-details',
  templateUrl: './postDetails.component.html',
  styleUrls: ['./postDetails.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class PostDetailsComponent implements OnInit {

  post: Post | null = null;
  isLoading = true;
  error: string | null = null;
  newCommentContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    public authService: AuthService,
        private router: Router
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId) {
      const id = Number(postId);
      this.forumService.getPostById(id).subscribe({
        next: (data) => {
          if (!data.comments) {
            data.comments = [];
          }
          this.post = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'No se pudo cargar el post. Es posible que no exista o haya ocurrido un error.';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  addComment(): void {
    if (!this.newCommentContent.trim() || !this.post) {
      return;
    }

    this.forumService.addCommentToPost(this.post.postId, { content: this.newCommentContent }).subscribe({
      next: (newComment) => {
        this.post?.comments.push(newComment);
        this.newCommentContent = '';
      },
      error: (err) => {
        console.error('Error al añadir el comentario:', err);
        alert('Hubo un error al enviar tu comentario.');
      }
    });

  }

  deletePost(): void {
        if (!this.post) return;

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir el borrado de este post.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, ¡bórralo!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.forumService.deletePost(this.post!.postId).subscribe({
                    next: () => {
                        Swal.fire('¡Borrado!', 'El post ha sido eliminado.', 'success');
                        this.router.navigate(['/forum']);
                    },
                    error: (err) => {
                        Swal.fire('Error', 'No se pudo borrar el post.', 'error');
                        console.error(err);
                    }
                });
            }
        });
    }
}
