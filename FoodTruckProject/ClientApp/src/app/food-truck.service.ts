import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})

export class FoodTruckService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  getCityFoodTrucks(city: string): any {
    return this.http.get(this.baseUrl + `api/PassportPage/foodTruckAPI?city=${city}`);
  }
}
