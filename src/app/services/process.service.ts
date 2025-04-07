
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) {}

  getTotalProcess(): Observable<{ processes: any[] }> {
    return this.http.get<{ processes: any[] }>('http://localhost:3000/api/process',this.getAuthHeader());
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
