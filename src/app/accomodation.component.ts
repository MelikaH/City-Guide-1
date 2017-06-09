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
let found_places: any[] = [];

@Component({
  selector: 'accomodation-detail',
  templateUrl: './app/accomodation.component.html',
  styleUrls: [ './app/accomodation.component.css' ]
})

export class AccomodationComponent implements OnInit , AfterViewChecked {
  found_places: any[] = [];
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
/*
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    request = {
      location: new google.maps.LatLng(this.city.lat, this.city.lng),
      radius: 50,
      type: 'lodging'
    };*/

    /*
     console.log("exited for with found going to copy to found places, length of found is " + found.length);

     for(var i = 0; i < found.length; i++) {
     console.log("copying " + found[i] + " from found to found_places");

     this.found_places.push(found[i]);

     console.log("copied to found places, " + this.found_places[i]);
     }


     console.log("should have coppied to found_places " + found_places.length);

     }*/
    this.ngZone.runOutsideAngular(() => {
      /*
      service.radarSearch(request, function (results: any, status: any) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
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
                console.log("ENTERED CALLBACK2 " + place.place_id);
                console.log("ENTERED CALLBACK2 " + place.name);
                if (status1 === google.maps.places.PlacesServiceStatus.OK) {
                  var photos = place.photos;
                  var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    title: place.name,
                    icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
                  });
                  google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent(place.name + " : " + place.website);
                    infoWindow.open(map, this);
                  });
                  found_places.push([place.name, place.formated_adress, place.icon]);
                  console.log(place.name + place.formated_adress + place.icon);
                }
              });
            }, j * 500);
          })(i);
        }
      });*/
      this._mineRadarSearch(() => {
        this.ngZone.run( () => { console.log("length of global found_places now is " + found_places.length) });
      });
    });
  }

  _mineRadarSearch(doneCallback: () => void){

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    request = {
      location: new google.maps.LatLng(this.city.lat, this.city.lng),
      radius: 50,
      type: 'lodging'
    };

    service.radarSearch(request, function (results: any, status: any) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
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
              console.log("ENTERED CALLBACK2 " + place.place_id);
              console.log("ENTERED CALLBACK2 " + place.name);
              if (status1 === google.maps.places.PlacesServiceStatus.OK) {
                var photos = place.photos;
                var marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location,
                  title: place.name,
                  icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
                });
                google.maps.event.addListener(marker, 'click', function () {
                  infoWindow.setContent(place.name + " : " + place.website);
                  infoWindow.open(map, this);
                });
                found_places.push([place.name, place.formated_adress, place.icon]);
                console.log(place.name + place.formated_adress + place.icon);
              }
            });
          }, j * 500);
        })(i);
      }

      if(found_places.length === results.length) doneCallback();
      else{
        window.setTimeout(() => {
        this._mineRadarSearch(doneCallback());
      }, 10);
      }
    });
  }
}


