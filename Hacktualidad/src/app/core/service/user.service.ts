// src/app/core/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserUpdateRequest } from '../../shared/interfaces/UserUpdateRequest';
import { UserRegister } from '../../shared/interfaces/UsuarioRegistrado';
import { User } from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  register(formData: FormData): Observable<User> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<User>(registerUrl, formData);
  }

  login(credentials: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post(loginUrl, credentials);
  }

  updateUser(id: number, userData: UserUpdateRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData, { withCredentials: true });
  }

}
