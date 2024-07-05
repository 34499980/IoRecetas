import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receta } from '../models/receta.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigsLoaderService } from './config-loader.service';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
      private httpClient: HttpClient,
      private config: ConfigsLoaderService,
    ) {
      this.apiEndpoint = this.config.apiUrl;
    }
    
  public getAll(): Observable<Receta[]> {   
    return this.httpClient.get<Receta[]>(`${this.apiEndpoint}/receta/getAll`)
  }
  public edit(input: Receta): Observable<any> {   
    return this.httpClient.put<any>(`${this.apiEndpoint}/receta/edit`, input)
  }
  public add(input: Receta): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/receta/add`, input)
  }
  public delete(input: string): Observable<any> {   
    const params = new HttpParams().set('key', input)
    return this.httpClient.get(`${this.apiEndpoint}/receta/removeget`,{params})
  }
}
