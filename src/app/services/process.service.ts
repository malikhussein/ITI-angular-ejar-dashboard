import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private apiUrl = 'http://localhost:3000/api/process';
  private fallbackToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTJlOGQxYzk0OTBjOTg5NWExYTRlZCIsInJvbGUiOiJhZG1pbiIsImlzVmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE3NDQwMzcxNzQsImV4cCI6MTc0NDEwOTE3NH0.V8U_VKHoNu5MdbvApgLDAIeyJiSjyQdom6S5dIBnKCs';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('UserToken') || this.fallbackToken;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTotalProcess(): Observable<{ processes: any[] }> {
    return this.http.get<{ processes: any[] }>(this.apiUrl, { headers: this.getHeaders() });
  }

  getAllProcesses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProcess(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createProcess(productId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}`, data, { headers: this.getHeaders() });
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { status }, { headers: this.getHeaders() });
  }

  updateProcess(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteProcess(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
