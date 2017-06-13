/**
 * Created by denis on 6/13/2017.
 */
import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { City } from './city';
import { CityService } from './city.service';


@Component({
  selector: 'notfound-detail',
  templateUrl: './app/notfound.component.html',
  styleUrls: [ './app/notfound.component.css' ],
})

export class NotfoundComponent implements OnInit {
  cities: City[];
  selectedCity: City;
  constructor( private router: Router,
               private cityService: CityService,
               private location: Location) { }

  getCities(): void {
    this.cityService.getCities().then(cities => this.cities = cities);
  }
  ngOnInit(): void {
    this.getCities();
  }
  onSelect(city: City): void {
    this.selectedCity = city;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCity.id]);
  }

  goBack(): void {
    this.location.back();
  }
}
