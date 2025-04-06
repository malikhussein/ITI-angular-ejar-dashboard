import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.baseUrl, this.getAuthHeader());
  }

  getUser(id: string): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(
      `${this.baseUrl}/${id}`,
      this.getAuthHeader()
    );
  }

  updateUser(id: string, data: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.getAuthHeader());
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeader());
  }

  private getAuthHeader() {
    const token =
      localStorage.getItem('UserToken') || sessionStorage.getItem('UserToken');
    console.log('Sending token:', token); // Check if null or undefined

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
