import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {  
  token = '';
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth.currentUser.subscribe(resp => {
      if(resp){
        this.token = resp.token;
        
      }
      else{
        this.token = '';
      }   
    });
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }); 
    //console.log('Intercepted HTTP call', authReq);
    return next.handle(authReq);
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, body).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, body).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`).pipe(catchError(this.formatErrors));
  }
}
