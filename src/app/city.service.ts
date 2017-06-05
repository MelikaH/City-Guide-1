import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { City } from './city';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CityService {

	private citiesUrl = './data.json';  // URL to web api
	constructor(private http: Http) { }


	  getCities(): Promise<City[]> {
	    return this.http.get(this.citiesUrl)
	               .toPromise()
	               .then(function(response) {  return response.json().data as City[]; })
	               .catch(this.handleError);
	  }

	  private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	  }

/*promjena getCity iz by ID u by NAME */
  getCity(name: string): Promise<City> {
    return this.getCities()
      .then(cities => cities.find(city => city.name === name))
      .catch(this.handleError);
  }

  getCityByID(id: number): Promise<City> {
    return this.getCities()
      .then(cities => cities.find(city => city.id === id))
      .catch(this.handleError);
  }


}