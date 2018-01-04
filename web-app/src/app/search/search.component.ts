import { Injectable, AfterViewInit, Component, Input, Output, OnInit, ViewEncapsulation, Renderer, EventEmitter  } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LocationService } from './location.service';
import { EntityService } from './entity.service';

import { locationModel } from '../common/objectModel/location-model';
import { entityModel } from '../common/objectModel/entity-model';

import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit { 
  
  @Input() search:{location:string, clinic:string} = {location:"",clinic:""};
  @Output() inputChange = new EventEmitter<any>();

  locationsList : locationModel [];
  clinicsList : entityModel [];
  locationList: any;
  clinicList: any;
  searchResults;
   
  constructor(private router: Router,private locationService : LocationService, private EntityService : EntityService, private route: ActivatedRoute, private completerService: CompleterService ) { }

  ngOnInit() {
    this.getLocationList();
    this.getClinicList();     
  }
   
  searchClinic(){
    this.locationService.setQueryParams(this.search); 
    if(this.search.clinic !="" && this.search.location !="" ) {
       this.router.navigate(['/search']);
    } 
  } 
  getLocationList() {        
    this.locationService.getLocation().subscribe(response =>{ 
      this.locationList = this.completerService.local(response, 'name', 'name') 
    }) ;  
  }
  getClinicList() {        
    this.EntityService.getListByCategory().subscribe(response =>{  
      let result = response;       
      this.clinicsList = result.filter(clinic => {
      //  if(clinic.searchTypeCode == 3){            
          return clinic;
      //  }     
      })
      this.clinicList = this.completerService.local(this.clinicsList, 'searchName', 'searchName') 
      
    }) ;    
  }
   
  emitEvent(event: any){
    this.inputChange.emit(event);    
  } 
  
  


   

}
