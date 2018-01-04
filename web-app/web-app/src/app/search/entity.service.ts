
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as AppUtils from '../common/app.utils';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { entityModel } from '../common/objectModel/entity-model';

@Injectable()
export class EntityService {

   clinicList: Observable<entityModel[]>; 
   location:string;
   clinic:string;  

  constructor(private http: Http) { }

  getEntities( url: string, loctype: number ): Observable<entityModel[]> {
    url = `${AppUtils.ENTITY_URL  + loctype}`;    
    this.clinicList= this.http.get(url)     
        .map(response =>  response.json().result)
        .catch(this.handleError);          
    return this.clinicList ;              
  }

  getListByCategory(): Observable<entityModel[]> {
    const url = `${AppUtils.ENTITY_URL}`;        
    this.clinicList= this.http.get(url)     
        .map(response =>  response.json().result)
        .catch(this.handleError);          
    return this.clinicList ;    
  }  

  private handleError(error: any) {
    return Observable.throw(error || 'Server error');
  }
  
  

}
