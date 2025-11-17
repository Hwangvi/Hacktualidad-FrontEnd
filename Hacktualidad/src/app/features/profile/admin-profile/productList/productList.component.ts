import { ProductService } from './../../../../core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/interfaces/Product';
import Swal from 'sweetalert2';
// ¡Importaciones clave de RxJS!
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {

  private refreshTrigger$ = new Subject<void>();

  products$!: Observable<Product[]>;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products$ = this.refreshTrigger$.pipe(
      startWith(undefined),
      switchMap(() => this.productService.getProducts())
    );
  }

  loadProducts(): void {
    this.refreshTrigger$.next();
  }

  onDeleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido borrado.',
              'success'
            );
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error al borrar el producto:', err);
            Swal.fire(
              'Error',
              'No se pudo borrar el producto. Inténtalo de nuevo.',
              'error'
            );
          }
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/profile/admin']);
  }
}
