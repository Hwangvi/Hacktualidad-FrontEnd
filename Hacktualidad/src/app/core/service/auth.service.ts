// src/app/core/service/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';

  private currentUserSubject = new BehaviorSubject<User | null>(null);


  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<User> {

    return this.http.post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  public updateCurrentUser(updatedUser: User): void {
    this.currentUserSubject.next(updatedUser);
  }
}
