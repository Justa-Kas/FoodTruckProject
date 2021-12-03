import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './Secret';

@Injectable({
  providedIn: 'root'
})

export class GeoMapService {
    constructor(private httpservice : HttpClient) {

  }

  apiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

  getGeoLocation(address: string): any {
    let finalUrl: string = this.apiUrl + address + '&key=' + Secret.gApiKey;
    console.log(finalUrl);
    return this.httpservice.get(finalUrl);
  }
}
