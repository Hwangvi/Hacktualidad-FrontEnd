import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/service/cart.service';
import { Cart } from '../../../shared/interfaces/Cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(data => {
      this.cart = data;
    });

    this.cartService.getCart().subscribe({
        error: (err) => console.log("Usuario no logueado")
    });
  }

  removeItem(productId: number): void {
    Swal.fire({
      title: 'DELETE_SEQUENCE?',
      text: "Se eliminará este ítem de la base de datos local.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CONFIRM DELETE',
      cancelButtonText: 'ABORT',
      background: 'rgba(10, 20, 10, 0.95)',
      color: '#00ff00',
      iconColor: '#ff0055',
      confirmButtonColor: '#ff0055',
      cancelButtonColor: '#00ff00',
      reverseButtons: true,
      backdrop: `rgba(0,0,0,0.8)`
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(productId).subscribe(() => {
          Swal.fire({
            title: 'DELETED',
            text: 'Item removed successfully.',
            icon: 'success',
            background: 'rgba(10, 20, 10, 0.95)',
            color: '#00ff00',
            confirmButtonColor: '#00ff00',
            iconColor: '#00ff00'
          });
        });
      }
    });
  }

  buy(): void {
    Swal.fire({
      title: 'EXECUTING_ORDER...',
      text: 'Encrypting transaction protocol...',
      icon: 'info',
      timer: 3000,
      timerProgressBar: true,
      background: 'rgba(10, 20, 10, 0.95)',
      color: '#00ff00',
      iconColor: '#00ff00',
      showConfirmButton: false,
      willClose: () => {
         Swal.fire({
            title: 'TRANSACTION COMPLETE',
            text: 'Receipt sent to encrypted email gateway.',
            icon: 'success',
            background: 'rgba(10, 20, 10, 0.95)',
            color: '#00ff00',
            confirmButtonColor: '#00ff00',
            iconColor: '#00ff00'
         });
      }
    });
  }
}
