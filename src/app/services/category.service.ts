
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class CategryService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    
  public getAll(): Observable<Category[]> {   
    return this.httpClient.get<Category[]>(`${this.apiEndpoint}/category/getAll`)
  }
  public edit(input: Category): Observable<any> {   
    return this.httpClient.put<any>(`${this.apiEndpoint}/category/edit`, input)
  }
  public add(input: Category): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/category/add`, input)
  }
  public delete(input: string): Observable<any> {   
    const params = new HttpParams().set('key', input)
    return this.httpClient.get(`${this.apiEndpoint}/category/removeget`,{params})
  }
  }