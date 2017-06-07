import { Component, OnInit } from '@angular/core';

import { City } from './city';
import { CityService } from './city.service';
import {StateService} from "./state.service";
import { Router }   from '@angular/router';

@Component({

	selector: 'my-dashboard',
	templateUrl: './app/dashboard.component.html',
	styleUrls: [ './app/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  cities: City[] = [];
  found_city: City;
  choice: string;
  id: number;

  constructor(private cityService: CityService, private stateService: StateService, private router: Router) {
  }

  ngOnInit(): void {
      this.choice = this.stateService.getChoice();
  }

  /*
    FOUND CITY IZ NEKOG RAZLOGA VRACA VRIJEDNOSTI
    !!!!!! ALI GO BUTTON FUNKCIONISE PRAVILNO TEK NAKON DRUGOG PRITISKANJA
   */
  goToChoice(c: string) {
      this.stateService.setChoice(c);
      this.cityService.getCity(c).then((found_city) => {
        this.found_city = found_city;
        this.id = this.found_city.id;
        this.router.navigate(['./detail/', this.id]);
      });
  }
}
