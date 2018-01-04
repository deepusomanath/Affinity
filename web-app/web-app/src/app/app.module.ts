import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { appRouterModule  } from './app.routes';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { SearchComponent } from './search/search.component';

import { LocationService } from './search/location.service';
import { EntityService } from './search/entity.service';
import { ClinicService } from './search/clinic.service';

import { Ng2CompleterModule } from "ng2-completer";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule.forRoot(),
    Ng2CompleterModule,
    appRouterModule,
    HttpModule

  ],
  providers: [LocationService,EntityService,ClinicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
