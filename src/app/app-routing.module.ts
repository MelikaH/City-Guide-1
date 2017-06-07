import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { CitiesComponent }      from './cities.component';
import { CityDetailComponent }  from './city-detail.component';
import { AccomodationComponent } from './accomodation.component';
import { FoodComponent } from './food.component';
import { PlacesComponent } from './places.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: CityDetailComponent },
  { path: 'cities',     component: CitiesComponent },
  { path: 'accomod/:id', component: AccomodationComponent},
  { path: 'food/:id', component: FoodComponent},
  { path: 'places/:id', component: PlacesComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
