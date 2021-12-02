import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Secret } from './Secret';

@Injectable()
export class FoodTruckService {
    constructor(private http : HttpClient) {

  }

  apiUrl: string = 'https://api.yelp.com/v3/businesses/search?term=food trucks&location='

  getCityFoodTrucks(city: string): any {
    let myHeader = new Headers();
    let key: string = 'Bearer ' + Secret.apiKey;
    myHeader.append('Authorization', key);

    return this.http.get(this.apiUrl + city, null, {Headers: myHeader});
  }
}
