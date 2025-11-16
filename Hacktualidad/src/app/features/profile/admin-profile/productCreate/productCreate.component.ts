import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductService } from './../../../../core/service/product.service';
import { CategoryService } from '../../../../core/service/Category.service';
import { Category } from './../../../../shared/interfaces/Category';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './productCreate.component.html',
  styleUrls: ['./productCreate.component.css']
})
export class ProductCreateComponent implements OnInit {

  public product = {
    name: '',
    description: '',
    price: null,
    stock: null,
    category: null as Category | null
  };

  public categories: Category[] = [];
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar las categorías', err);
        Swal.fire('Error', 'No se pudieron cargar las categorías desde el servidor.', 'error');
      }
    });
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => { this.imagePreview = reader.result; };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(this.product)], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => {
        Swal.fire({ title: '¡PRODUCTO CREADO!', text: 'El nuevo producto ha sido añadido.', icon: 'success' })
           .then(() => this.router.navigate(['/profile/admin']));
      },
      error: (err) => Swal.fire({ title: 'ERROR', text: 'No se pudo crear el producto.', icon: 'error' })
    });
  }
}
