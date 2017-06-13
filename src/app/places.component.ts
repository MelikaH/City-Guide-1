/**
 * Created by denis on 6/6/2017.
 */

import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, AfterViewChecked, NgZone } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { City } from './city';
import { CityService } from './city.service';

declare var google: any;
let infoWindow: any;
let service: any;
let request: any;
let map: any = null;

@Component({
  selector: 'place-detail',
  templateUrl: './app/places.component.html',
  styleUrls: [ './app/places.component.css' ]
})

export class PlacesComponent implements OnInit , AfterViewChecked {
  found_places: any[] = [];
  information: any;
  @Input() city: City;

  constructor(private cityService: CityService,
              private route: ActivatedRoute,
              private location: Location,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.cityService.getCityByID(+params['id']))
      .subscribe(city => {
        this.city = city;
      });
  }

  ngAfterViewChecked(): void {
    if (document.getElementById('map') != null && map == null) {
      this.initMap();

    }
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
  }


  initMap(): void {
    console.log("Initialising map");
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(this.city.lat, this.city.lng)
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.city.lat, this.city.lng),
      map: map
    });

    console.log("Start of added code");

    this.ngZone.runOutsideAngular(() => {
      this._mineRadarSearch(this, () => {
        this.ngZone.run( () => {
          console.log("length of global found_places now is " + this.found_places.length)

          if(this.found_places.length==0) this.information="No accomodation found!";
          else {
            this.information="Found "+this.found_places.length+" accomodations!";
          }
        });
      });
    });
  }

  _mineRadarSearch(comp:any, doneCallback: () => void){

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    request = {
      location: new google.maps.LatLng(this.city.lat, this.city.lng),
      radius: 2000,
      keyword: 'historical landmark tourist attraction historical place'

  };
    service.radarSearch(request, function (results: any, status: any) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        doneCallback();
        return;
      }
      console.log("radarSearch returned " + results.length + " results");
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].place_id);
        (function (j) {
          var request1 = {
            placeId: results[i].place_id
          };
          service = new google.maps.places.PlacesService(map);
          setTimeout(function () {
            service.getDetails(request1, function (place: any, status1: any) {
              if (status1 === google.maps.places.PlacesServiceStatus.OK) {
                console.log("ENTERED CALLBACK2 " + place.place_id);
                console.log("ENTERED CALLBACK2 " + place.name);
                var photos = place.photos;

                var marker1 = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location,
                  title: place.name,
                  icon: (undefined != photos)?photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50}):'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  color:'#00f'
                });
                google.maps.event.addListener(marker1, 'click', function () {
                  infoWindow.setContent(place.name + " : " + place.website);
                  infoWindow.open(map, this);
                });

                comp.found_places.push({name:place.name, url:place.url, address:place.formatted_address, phone:place.formatted_phone_number,photo:(undefined != photos)?photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}):null,icon:place.icon});
                //console.log(place);
                doneCallback();
              }
            });
          }, j * 500);
        })(i);
      }

      if(comp.found_places.length === results.length) doneCallback();
      else{
        window.setTimeout(() => {
          //comp._mineRadarSearch(comp,doneCallback);
        }, 10);
      }
    });
  }
}

