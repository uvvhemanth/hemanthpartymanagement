import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'assets/postman-collection.json';

  constructor(private http: HttpClient) { }

  getPartyData() {
    return this.http.get<any>(this.apiUrl);
  }

  getLoginEndpoint(): Observable<string> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => {
        const loginEndpoint = data.item.find((item:any) => item.name === 'AUTHENTICATION')
          .item.find((subItem:any) => subItem.name === 'LOGIN POST')
          .request.url.raw;
        return loginEndpoint;
      })
    );
  }
  getEndpointData(endpointName: string): Observable<any> {
    return this.getPartyData().pipe(
      map(data => {
        const endpoint = data.item.find((item: any) => item.name === endpointName);
        if (endpoint) {
          const url = endpoint.request.url.raw;
          return this.http.get(url);
        } else {
          throw new Error(`Endpoint '${endpointName}' not found.`);
        }
      })
    );
  }
  filterHandler(dt: any, ev: any) {
    dt.filterGlobal(ev.target.value, 'contains');
  }


  login(username: string, password: string): Observable<any> {
    return this.getLoginEndpoint().pipe(
      map(loginEndpoint => {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        return this.http.post(loginEndpoint, body.toString(), { headers });
      })
    );
  }


  getData(apiname: string, data: any): Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl + apiname, data, { headers });
  }

  adddata(apiname: string, data: any): Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl + '/party/', data, { headers });
  }
  delData(apiname: string, data: any): Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl + '/party/', data, { headers });
  }

  updateJsonData(updatedData: any): Observable<any> {
    return this.getLoginEndpoint().pipe(
      map(loginEndpoint => {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new URLSearchParams();
        body.set('key', updatedData.key);
        body.set('value', updatedData.value);
        body.set('description', updatedData.description);
        body.set('type', updatedData.type);
        return this.http.post(loginEndpoint, body.toString(), { headers });
      })
    );
    // return this.http.post(this.apiUrl, updatedData);
  }

}
