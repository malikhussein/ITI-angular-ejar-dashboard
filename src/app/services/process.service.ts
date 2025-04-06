
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) {}

  getTotalProcess(): Observable<{ processes: any[] }> {
    return this.http.get<{ processes: any[] }>('http://localhost:3000/api/process');
  }
  }
