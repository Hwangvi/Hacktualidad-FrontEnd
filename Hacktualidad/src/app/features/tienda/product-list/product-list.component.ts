import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../shared/interfaces/Product';
import { ProductService } from '../../../core/service/product.service';
import { CategoryColorPipe } from '../../../shared/pipes/categoryColor.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryColorPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ProductListComponent: CONSTRUCTOR llamado');
  }

  ngOnInit(): void {
    console.log('ProductListComponent: ngOnInit -- ¡Iniciando carga de productos!');
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
        this.products = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('ProductListComponent: ngOnDestroy -- Componente destruido');
  }
}
