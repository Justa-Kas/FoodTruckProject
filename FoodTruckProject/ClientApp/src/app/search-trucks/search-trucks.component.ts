import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodTruckService } from '../food-truck.service';
import { GeoMapService } from '../geo-map.service';
import { geoMap } from '../geoMap';
import { FoodTruck, TruckList } from '../TruckList';




@Component({
    selector: 'app-search-trucks',
    templateUrl: './search-trucks.component.html',
    styleUrls: ['./search-trucks.component.css']
})
/** SearchTrucks component*/
export class SearchTrucksComponent {
    /** SearchTrucks ctor */
  constructor(private foodtruckservice: FoodTruckService, private geomapservice: GeoMapService, private router: ActivatedRoute) {
    

  }

  address: string = 'westland';

  ngOnInit(): void {
    this.getLocation(this.address);
    

  }

  geoResults: geoMap = {} as geoMap;
  lati: number = 0;
    longi: number = 0;


  getLocation(address: string): void {
    this.geomapservice.getGeoLocation(address).subscribe((response: any) => {
      this.geoResults = response;
      console.log(this.geoResults);
      this.lati = this.geoResults.results[0].geometry.location.lat;
      this.longi = this.geoResults.results[0].geometry.location.lng;


    });
  }

  initMap(): void {
    let map: google.maps.Map;
    let lati: number = this.geoResults.results[0].geometry.location.lat;
    let longi: number = this.geoResults.results[0].geometry.location.lng;
    console.log(lati);
    console.log(longi);
    const center: google.maps.LatLngLiteral = { lat: lati, lng: longi };
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 8
    });
  }

}
