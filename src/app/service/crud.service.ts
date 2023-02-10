import { Injectable } from '@angular/core';
import { Book } from './Books';
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

   // UPDATE
   updateBook(id: any, data: any): Observable<any> {
      let API_URL = `${this.REST_API}/update-book/${id}`;
      return this.httpClient
         .put(API_URL, data, { headers: this.httpHeaders })
         .pipe(catchError(this.handleError));
   }

   // DELETE
   deleteBook(id: any): Observable<any> {
      let API_URL = `${this.REST_API}/delete-book/${id}`;
      return this.httpClient
         .delete(API_URL, { headers: this.httpHeaders })
         .pipe(catchError(this.handleError));
   }

   // ERROR
   handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
         // HANDLE CLIENT ERROR
         errorMessage = error.error.message;
      } else {
         // HANDLE SERVER ERROR
         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(() => {
         errorMessage;
      });
   }
}
