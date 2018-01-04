import { Component, OnInit,  Output, ViewChild, EventEmitter, ViewChildren  } from '@angular/core';

import { SearchComponent } from '../search/search.component';

import { entityModel } from '../common/objectModel/entity-model';
import { locationModel } from '../common/objectModel/location-model';
import { clinicModel } from '../common/objectModel/clinic-model';

import { LocationService } from '../search/location.service';
import { EntityService } from '../search/entity.service';
import { ClinicService } from '../search/clinic.service';

import { Observable } from 'rxjs/Rx';
import { MzDatepickerModule } from 'ng2-materialize'
import * as AppUtils from '../common/app.utils';

@Component({
  selector: 'app-clinic-listing',
  templateUrl: './listing.component.html'

})
export class ListingComponent implements OnInit {

  @ViewChild(SearchComponent) mainSearch: SearchComponent;

     locationsList : locationModel[];
     clinicsList : entityModel[];
     specialityList : entityModel[];
     hospitalList: entityModel[];
     clinicListDetails : clinicModel[]; 
     
     location:string;
     clinic:string;     
     searchParam: { location : string, clinic: string }; 
     showFilters: boolean = true;
     toggleFilters: boolean;  
     appointmentTime:boolean = false;
     
     url: string;
     loctype: number;      
     searchCode : number;
     searchTypeCode : number;
     searchName : string;
     clinicSearchName :string;

     @ViewChildren('myItem') item;
     selectedIds = [];


     @Output()
     onFilterChange = new EventEmitter<any>()
           
     public options: Pickadate.DateOptions = {
        format: 'dddd, dd mmm, yyyy',
        formatSubmit: 'yyyy-mm-dd',
     };
   

  constructor( private locationService: LocationService, private EntityService : EntityService,  private clinicService : ClinicService) { }

  ngOnInit() {         
   this.searchParam = this.locationService.getQueryParams(); 
   this.clinicSearchList();
   this.specialityFilterList();
   this.hospitalFilterList();  
  }  

  

  clinicSearchList() {        
        this.locationService.getLocation().subscribe(response =>{
            let locList = response;             
            locList.filter(loc =>{
              if(this.searchParam.location == loc.name ){ 
                this.loctype = loc.type; 

                //get all clinics based on location Type
                this.EntityService.getEntities(this.url, this.loctype).subscribe(response =>{        
                  let result = response; 
                  this.clinicsList = result.filter(clinic => {  

                      if(this.searchParam.clinic == clinic.searchName ){
                        this.searchCode = clinic.searchCode;
                        this.searchTypeCode = clinic.searchTypeCode
                        
                        console.log(' --searchCode--',this.searchCode);  
                        console.log(' --searchTypeCode--',this.searchTypeCode); 

                         //get clinic based on search Code & search Type         
                        this.clinicService.getClinic(this.url,this.loctype,this.searchCode,this.searchTypeCode).subscribe(response =>{        
                              let result = response; 
                              this.clinicListDetails = result.filter(clinicDetails => { 
                                console.log(' --clinicDetails final result--',clinicDetails);
                                return clinicDetails;
              
                              })
                          });
                                              
                      } 
                    })    
                });
              }          
            })
          });  
          
      } 
       

      specialityFilterList() {        
        this.EntityService.getListByCategory().subscribe(response =>{        
          let result = response;             
            this.specialityList = result.filter(speciality => {
              if(speciality.searchTypeCode == 1 ){                 
                      return speciality;
              }
          })
        });
      }
      hospitalFilterList() {        
        this.EntityService.getListByCategory().subscribe(response =>{        
          let result = response;             
            this.hospitalList = result.filter(hospital => {
              if(hospital.searchTypeCode == 2 ){                 
                      return hospital;
              }
          })
        });
      }
      
      
      onInputChange(searchName, event){      
        console.log(event.target.checked)
        if (event.target.checked === true) {
          this.selectedIds.push({searchName: searchName, checked: event.target.checked});
          console.log('Selected  true ', this.selectedIds);
        }
        if (event.target.checked === false) {
          this.selectedIds = this.selectedIds.filter((item) => item.searchName !== searchName);
          console.log('Selected  false ', this.selectedIds);
        }
        
      }

      
      
 

  
  
  
       

}
