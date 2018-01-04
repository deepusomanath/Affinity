import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as AppUtils from '../common/app.utils';

import { locationModel } from '../common/objectModel/location-model';
import { entityModel } from '../common/objectModel/entity-model';
import { clinicModel } from '../common/objectModel/clinic-model';


@Injectable()
export class ClinicService {

   clinicDetails: Observable<clinicModel[]>; 
   entityList: Observable<entityModel[]>; 
   location:string;
   clinic:string;

  constructor(private http: Http) { }

  getClinic(url:string, loctype: number ,searchcode : number,searchtypeCode: number ): Observable<clinicModel[]> {    
    url = `${AppUtils.CLINIC_URL + loctype + '&searchCode=' + searchcode + '&searchTypeCode='+ searchtypeCode}`;    
    this.clinicDetails= this.http.get(url)     
        .map(response =>  response.json().result)
        .catch(this.handleError);          
    return this.clinicDetails ;  
  }
  
  private handleError(error: any) {
    return Observable.throw(error || 'Server error');
  }


}
