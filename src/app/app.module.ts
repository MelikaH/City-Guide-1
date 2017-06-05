import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CitiesComponent }  from './cities.component';
import { DashboardComponent }  from './dashboard.component';
import { CityService }  from './city.service';
import { CityDetailComponent } from './city-detail.component';
import { AppRoutingModule }     from './app-routing.module';
import {StateService} from './state.service';

@NgModule({
  imports:      [ BrowserModule , FormsModule, AppRoutingModule, HttpModule	],
  declarations: [ AppComponent, CitiesComponent, DashboardComponent, CityDetailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [CityService, StateService],
})
export class AppModule { }
