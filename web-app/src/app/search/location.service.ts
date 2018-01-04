import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as AppUtils from '../common/app.utils';
import { locationModel } from '../common/objectModel/location-model';

@Injectable()
export class LocationService {

  locationList: Observable<locationModel[]>;  
  searchCriteria: any; 

  constructor(private http: Http) { }
  getLocation(): Observable<locationModel[]> {
    const url = `${AppUtils.LOCATION_URL}`;   
    this.locationList= this.http.get(url)     
        .map(response =>  response.json().result)
        .catch(this.handleError);          
    return this.locationList ;
  }

  private handleError(error: any) {
    return Observable.throw(error || 'Server error');
 }

 setQueryParams(searchCriteria){
   this.searchCriteria = searchCriteria;   
 }
 getQueryParams(){
   return this.searchCriteria || {};
 }
  

}
