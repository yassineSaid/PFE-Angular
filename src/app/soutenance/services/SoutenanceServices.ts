import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Soutenance } from '../entities/Soutenance';


@Injectable({
    providedIn: 'root'
  })
  export class SoutenanceService {
    constructor(private httpClient:HttpClient) { }
    getSoutenance(){
      return this.httpClient.get<Soutenance[]>(
          'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance'
      );}

      addSoutenance(Soutenance){
        const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.post<Soutenance>(
            'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance'+Soutenance,httpOptions
          
        )}
  }
