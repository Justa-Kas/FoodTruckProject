import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { FoodTruckService } from '../food-truck.service';
import { GeoMapService } from '../geo-map.service';
import { geoMap } from '../geoMap';
import { Secret } from '../Secret';
import { FoodTruck, TruckList } from '../TruckList';

@Component({
    selector: 'app-food-trucks',
    templateUrl: './food-trucks.component.html',
    styleUrls: ['./food-trucks.component.css']
})
/** FoodTrucks component*/
export class FoodTrucksComponent {
    /** FoodTrucks ctor */
  constructor(private foodtruckservice: FoodTruckService, private router: ActivatedRoute, private geomapservice: GeoMapService, private authorizeservice: AuthorizeService) {

  }

  ngOnInit(): void {
    this.loadDefaultMap();
    this.isAuthenticated = this.authorizeservice.isAuthenticated();
  }

  public isAuthenticated: Observable<boolean>;


  city: string = "";
  //lat: number = 42.331429;
  //long: number = -83.045753;


  TrucksObj: TruckList = {} as TruckList;
  cityTrucks: FoodTruck[] = [];
  address: string = 'detroit'; //ROUTEPARAMS FROM USER LOCATION
  getLat: number = 0;
  getLong: number = 0;

  getAllTrucks(lati:number, longi : number): void {
    this.foodtruckservice.getCityFoodTrucks(lati,longi).subscribe((response: any) => {
      this.TrucksObj = response;
      console.log(this.TrucksObj);

      this.cityTrucks = this.TrucksObj.businesses;
      this.city = this.cityTrucks[0].location.city;
      console.log(this.cityTrucks);
    })
  }

  loadDefaultMap(): any {
    this.getLat = 42.331429;
    this.getLong = -83.045753;
    this.geomapservice.initMap(this.mapElement, this.getLat, this.getLong);
  }

  geoResults: geoMap = {} as geoMap;

  getLocation(form: NgForm): void {
    console.log('address=', form.form.value.address); 
    this.geomapservice.getGeoLocation(form.form.value.address).subscribe((response: any) => {
      this.geoResults = response;
      console.log(this.geoResults);
      this.getLat = this.geoResults.results[0].geometry.location.lat;
      this.getLong = this.geoResults.results[0].geometry.location.lng;
      console.log(this.getLat, this.getLong);

      this.loadMap();
      
    });
  }

  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;

  //renderMap() {

  //  window['initMap'] = () => {
  //    this.loadMap();
  //  }
  //  if (!window.document.getElementById('google-map-script')) {
  //    var s = window.document.createElement("script");
  //    s.id = "google-map-script";
  //    s.type = "text/javascript";
  //    s.src = `https://maps.googleapis.com/maps/api/js?key=${Secret.gApiKey}&amp;callback=initMap`;

  //    window.document.body.appendChild(s);
  //  } else {
  //    this.loadMap();
  //  }
  //}

  loadMap = () => {

    this.getAllTrucks(this.getLat, this.getLong);
    console.log(this.getLat, this.getLong);

    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.getLat, lng: this.getLong },
      zoom: 8
    });

    var marker = new window['google'].maps.Marker({
      position: { lat: this.getLat, lng: this.getLong },
      map: map,
      title: 'Hello World!',
      draggable: true,
      animation: window['google'].maps.Animation.DROP,
    });

    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3 id="thirdHeading" class="thirdHeading">W3path.com</h3>' +
      '<div id="bodyContent">' +
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
      '</div>' +
      '</div>';

    var infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

  }
}
