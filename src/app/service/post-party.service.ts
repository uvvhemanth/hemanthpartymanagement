
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Party {
    id: number;
    name: string;
    // other fields...
  }
@Injectable({
    providedIn: 'root'
})
export class PostPartyService {
    // private baseUrl: string = 'http://127.0.0.1:8000';
    private baseUrl = 'assets/postman-collection.json';

    private apiKey: string = 'd343c5e246bff4205e32879ede474d863367553c';

    constructor(private http: HttpClient){

    }
    getAllParties(): Observable<Party[]> {
        const url = `${this.baseUrl}`;
        const headers = new HttpHeaders({
            'Authorization': `Token ${this.apiKey}`
        });
        return this.http.get<Party[]>(url, { headers });
    }
    // getAllParties(): Observable<any> {
    //     const url = `${this.baseUrl}/party/`;
    //     return this.http.get(url, this.getHttpOptions());
    //   }
      
    
      private getHttpOptions() {
        return {
          headers: new HttpHeaders({
            'Authorization': 'Token d343c5e246bff4205e32879ede474d863367553c' 
          })
        };
      }
}