import { ProductService } from './../../../../core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/interfaces/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

 ngOnInit(): void {
  this.productService.getProducts().subscribe({
    next: (data) => {
      console.log('Productos recibidos correctamente:', data);
      this.products = data;
    },
    error: (err) => {
      console.error('¡ERROR al obtener la lista de productos!:', err);
      Swal.fire({
        title: 'Error Inesperado',
        text: 'No se pudo cargar la lista de productos desde el servidor.',
        icon: 'error',

      });
    }
  });
}

  onDeleteProduct(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede revertir.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, ¡bórralo!',
    cancelButtonText: 'Cancelar',
    // ... tus estilos
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.productId !== id);
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido borrado.',
            'success'
          );
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
