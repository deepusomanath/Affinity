//import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';

// Route Configuration
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: ListingComponent },
  
];

export const appRouterModule : ModuleWithProviders = RouterModule.forRoot(routes);