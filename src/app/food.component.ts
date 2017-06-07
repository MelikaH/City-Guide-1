/**
 * Created by denis on 6/6/2017.
 */


import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { City } from './city';
import { CityService } from './city.service';

declare var google: any;

@Component({
  selector: 'food-detail',
  templateUrl: './app/food.component.html',
  styleUrls: [ './app/food.component.css' ]
})

export class FoodComponent implements OnInit, AfterViewChecked{
  @Input()
  city: City;

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute,
    private location: Location
  ) {

  }
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.cityService.getCityByID(+params['id']))
      .subscribe(city => {this.city = city; } );
  }

  ngAfterViewChecked(): void {
   if(document.getElementById('map') != null && this.map == null)
   this.initMap();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  }

  
   private map:any=null;
   initMap(): void {
   this.map = new google.maps.Map(document.getElementById('map'), {
   zoom: 10,
   center: new google.maps.LatLng(this.city.lat,this.city.lng)
   });
   var marker = new google.maps.Marker({
   position: new google.maps.LatLng(this.city.lat,this.city.lng),
   map: this.map
   });

}
