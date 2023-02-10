import { Injectable } from '@angular/core';
import { Book } from './Book';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
   HttpClient,
   HttpHeaders,
   HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
   providedIn: 'root',
})
export class CrudService {
   // Node/Express API
   REST_API: string = 'http://localhost:8000/api';

   // Http Header
   httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
   constructor(private httpClient: HttpClient) {}

   // Add
   AddBook(data: Book): Observable<any> {
      let API_URL = `${this.REST_API}/add-book`;
      return this.httpClient
         .post(API_URL, data)
         .pipe(catchError(this.handleError));
   }

   // GET ALL OBJECTS
   GetBooks() {
      return this.httpClient.get(`${this.REST_API}`);
   }

   // GET SINGLE OBJECT
   GetBook(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/read-book/${id}`;
      return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
         map((res: any) => {
            return res || {};
         }),
         catchError(this.handleError)
      );
   }
}
