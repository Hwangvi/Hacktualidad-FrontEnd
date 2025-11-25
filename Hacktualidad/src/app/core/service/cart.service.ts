import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../../shared/interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCart().subscribe({
      error: () => console.log('Usuario no autenticado o carrito vacío')
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl, { withCredentials: true }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addToCart(productId: number): Observable<Cart> {
    const url = `${this.apiUrl}/add/${productId}`;
    return this.http.post<Cart>(url, {}, { withCredentials: true }).pipe(
      tap(updatedCart => {
        this.cartSubject.next(updatedCart);
      })
    );
  }

  removeFromCart(productId: number): Observable<Cart> {
    const url = `${this.apiUrl}/remove/${productId}`;
    return this.http.delete<Cart>(url, { withCredentials: true }).pipe(
      tap(updatedCart => {
        this.cartSubject.next(updatedCart);
      })
    );
  }

  getCurrentCartValue(): Cart | null {
    return this.cartSubject.value;
  }
}
