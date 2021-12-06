/// <reference types="@types/googlemaps" />

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './Secret';

declare var window: any;

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
  private static promise;
  map: google.maps.Map;

  public static load() {
    if (!GeoMapService.promise) { // load once
      GeoMapService.promise = new Promise((resolve) => {
        window['__onGapiLoaded'] = (ev) => {
          console.log('gapi loaded')
          resolve(window.gapi);
        }
        console.log('loading..')
        const node = document.createElement('script');
        node.src = `https://maps.googleapis.com/maps/api/js?key=${Secret.gApiKey}&callback=__onGapiLoaded`;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    return GeoMapService.promise;
  }

  initMap(gmapElement, lat, lng) {

    return GeoMapService.load().then((gapi) => {
      this.map = new google.maps.Map(gmapElement.nativeElement, {
        center: new google.maps.LatLng(lat, lng),
        zoom: 12
      });
    });
  }

}
