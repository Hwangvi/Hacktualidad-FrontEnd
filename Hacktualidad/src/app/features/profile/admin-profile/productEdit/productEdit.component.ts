import { Product } from './../../../../shared/interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/service/product.service';
import { Category } from '../../../../shared/interfaces/Category';
import { CategoryService } from '../../../../core/service/Category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productEdit.component.html',
  styleUrls: ['./productEdit.component.css']
})
export class ProductEditComponent implements OnInit {
  editableProduct: Product | null = null;
  errorMessage: string | null = null;
  public categories: Category[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}


  compareCategories(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.categoryId === c2.categoryId : c1 === c2;
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(product => {
        this.editableProduct = product;
        if (product.photo) {
          this.imagePreview = 'http://localhost:8080/uploads/' + product.photo;
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (!this.editableProduct) return;
    const productUpdateData = {
      name: this.editableProduct.name,
      description: this.editableProduct.description,
      price: this.editableProduct.price,
      stock: this.editableProduct.stock
    };
    const formData = new FormData();
    formData.append('product', JSON.stringify(productUpdateData));
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.productService.updateProduct(this.editableProduct.productId, formData).subscribe({
      next: () => {
        Swal.fire('¡Actualizado!', 'El producto ha sido modificado.', 'success')
           .then(() => this.router.navigate(['/profile/admin/products/list']));
      },
      error: (err) => this.errorMessage = 'No se pudo actualizar el producto.'
    });
  }

  onCancel(): void {
    this.router.navigate(['/profile/admin/products/list']);
  }
}
