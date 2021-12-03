import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})

export class FoodTruckService {
    constructor(private http : HttpClient) {

  }

  apiUrl: string = 'https://api.yelp.com/v3/businesses/search?term=food trucks&location='

  getCityFoodTrucks(city: string): any {
    let myHeader = new HttpHeaders();
    let key: string = 'Bearer ' + Secret.apiKey;
    //myHeader.append('Authorization', key);
    myHeader.set('Authorization', key);

    return this.http.get(this.apiUrl + city, { "headers": myHeader });
  }
}
