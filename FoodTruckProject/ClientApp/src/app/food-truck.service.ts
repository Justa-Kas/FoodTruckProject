import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})

export class FoodTruckService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  //apiUrl: string = 'https://api.yelp.com/v3/businesses/search?term=food trucks&location='

  getCityFoodTrucks(city: string): any {


    //let myHeader = new HttpHeaders();
    //let key: string = 'Bearer ' + Secret.apiKey;
    ////myHeader.append('Authorization', key);
    //myHeader.set('Authorization', key)
    //.set('content-type', 'application/json')
    //  .set('Access-Control-Allow-Origin', '*');


    return this.http.get(this.baseUrl + `api/PassportPage/foodTruckAPI?city=${city}`);
  }
}
