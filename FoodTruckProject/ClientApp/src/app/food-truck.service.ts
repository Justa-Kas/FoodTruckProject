import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Secret } from './Secret';


@Injectable({
  providedIn: 'root'
})

export class FoodTruckService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string ) {

  }

  getCityFoodTrucks(latti : number, longi : number): any {
    return this.http.get(this.baseUrl + `api/PassportPage/foodTruckAPI?lat=${latti}&lng=${longi}`);
  }
}
