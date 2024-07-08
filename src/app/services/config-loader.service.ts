
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import * as packageJson from '../../../package.json';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigsLoaderService {
    private httpClient: HttpClient;
    prod: string = 'https://recetas-api-iota.vercel.app/api';    
    dev: string = 'http://localhost:8080/api';
    uiURL: string = 'https://io-gastos-git-master-34499980s-projects.vercel.app';
    private config: Configs = {
      apiUrl: `${this.prod}`,
      uiUrl: `${this.uiURL}`
    };
    get packageJson() {return packageJson}
    
    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
      }
    get apiUrl() {
        return this.config.apiUrl;
    }
    public async loadConfigs(): Promise<void> {
      //  this.config = await firstValueFrom(this.httpClient.get<Configs>('config/config.json'));
    }   
    public async changeURL(value: string): Promise<void> {
      this.config.apiUrl = value;
    }     
  }  
  export interface Configs {
    apiUrl: string;
    uiUrl: string;
  }