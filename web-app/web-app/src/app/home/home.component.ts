import { Injectable,Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
   @ViewChild(SearchComponent) mainSearch: SearchComponent;
 
  constructor() {   }

  ngOnInit() { 
    
  }
  
 
}

