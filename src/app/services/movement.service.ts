
import { Observable } from "rxjs";
import { Item } from "../models/item.model";
import { ConfigsLoaderService } from "./config-loader.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Category, Movement, SummaryByYear } from "../models/models";

@Injectable({
    providedIn: 'root'
  })
  export class MovementService {
    private apiEndpoint = '';
    headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    constructor(
        private httpClient: HttpClient,
        private config: ConfigsLoaderService,
      ) {
        this.apiEndpoint = this.config.apiUrl;
      }

    
  public getByMonth(month: string, year: string): Observable<Movement[]> {   
    const params = new HttpParams().set('month', month)
                                   .set('year', year);
    const urlWithParams = `${this.apiEndpoint}?${params.toString()}`;

    return this.httpClient.get<Movement[]>(`${this.apiEndpoint}/movement/getByMonth`,{params})
  }
  public edit(input: Movement): Observable<any> {   
    return this.httpClient.put<any>(`${this.apiEndpoint}/movement/edit`, input)
  }
  public add(input: Movement): Observable<any> {   
    return this.httpClient.post<any>(`${this.apiEndpoint}/movement/add`, input)
  }
  public delete(input: string): Observable<any> {   
    const params = new HttpParams().set('key', input)
    return this.httpClient.delete<any>(`${this.apiEndpoint}/movement/remove`,{params})
  }
  public getAllTotals(): Observable<SummaryByYear[]> {   
      return this.httpClient.get<SummaryByYear[]>(`${this.apiEndpoint}/totals/getAll`)
  }
  public processTotals(): Observable<any> {   
    return this.httpClient.get<any>(`${this.apiEndpoint}/totals/processTotals`)
  }
  public removeOldDues(): Observable<any> {   
  return this.httpClient.get<any>(`${this.apiEndpoint}/totals/removeOldDues`)
  }
  public getTotalByMonth(): Observable<boolean> {   
    return this.httpClient.get<boolean>(`${this.apiEndpoint}/totals/getByMonth`)
    }
  }