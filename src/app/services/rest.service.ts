import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable({
  providedIn: 'root'
})


export class RestService {

  constructor( private http: HttpClient) {
  }

  getData(): any {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  // deleted_data(id:any): any {
  //   return this.http.delete(`	https://dummy.restapiexample.com/api/v1/delete/${id}`);
  // }

  deleted_data(id:any): Observable<any>{
    console.log("id : ",id)
    return this.http.delete<any>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
  addData(data:any):Observable<any>{
    return this.http.post<any>('https://jsonplaceholder.typicode.com/posts',data)
  }
  getDetails(id:any):Observable<any>{
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  updateData(id:number,data:any):Observable<any>{
    console.log("data : ",data)
    return this.http.put<any>(`https://jsonplaceholder.typicode.com/posts/${id}`,data);
  }
  
}
