import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { City } from './city';
import { CityService } from './city.service';

@Component({
  selector: 'my-city-detail',
  templateUrl: './app/city-detail.component.html',
  styleUrls: [ './app/city-detail.component.css' ]
})

export class CityDetailComponent implements OnInit , AfterViewChecked{
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
    .switchMap((params: Params) => this.cityService.getCity(+params['id']))
    .subscribe(city => {this.city = city;});
	}
	
ngAfterViewChecked(): void {
	if(document.getElementById('map')!=null && this.map==null)
		this.initMap();
}

goBack(): void {
  this.location.back();
}

save(): void {
}

private map=null;
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
}
