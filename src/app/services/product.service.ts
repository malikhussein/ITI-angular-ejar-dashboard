import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


getallProducts():Observable<any>{

  return this.http.get('http://localhost:3000/api/product/')
}
removeProduct(id:number):Observable<any>{

  return this.http.delete(`http://localhost:3000/api/product/${id}`)
}



}
