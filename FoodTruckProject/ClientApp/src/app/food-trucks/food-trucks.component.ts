import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { FoodTruckService } from '../food-truck.service';
import { GeoMapService } from '../geo-map.service';
import { geoMap } from '../geoMap';
import { PassportService } from '../passport.service';
import { passportPage } from '../passportPage';
import { Secret } from '../Secret';
import { FoodTruck, TruckList } from '../TruckList';
import { WishListService } from '../wish-list.service';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishListItem } from '../WishList';

@Component({
    selector: 'app-food-trucks',
    templateUrl: './food-trucks.component.html',
    styleUrls: ['./food-trucks.component.css']
})
/** FoodTrucks component*/
export class FoodTrucksComponent {
    /** FoodTrucks ctor */
  constructor(private foodtruckservice: FoodTruckService, private router: ActivatedRoute, private geomapservice: GeoMapService, private authorizeservice: AuthorizeService, private wishlistservice:WishListService, private routing : Router, private passportService: PassportService) {

  }

  TrucksObj: TruckList = {} as TruckList;
  cityTrucks: FoodTruck[] = [];
  address: string = 'detroit'; //ROUTEPARAMS FROM USER LOCATION
  getLat: number = 0;
  getLong: number = 0;
  city: string = "";
  public isAuthenticated: Observable<boolean>;
  public Passport: passportPage[] = [];
  isInPassport: boolean = false;
  geoResults: geoMap = {} as geoMap;
  WishList: WishListItem[] = [];
  isInWishList: boolean = false;
  filteredTrucks: FoodTruck[] = [];

  ngOnInit(): void {
    this.loadDefaultMap();
    this.isAuthenticated = this.authorizeservice.isAuthenticated();
    this.isInWishList = false;
    this.passportService.getAllPages().subscribe((response: any) => {
      this.Passport = response;
    });
  }

  getAllTrucks(lati:number, longi : number): void {
    this.foodtruckservice.getCityFoodTrucks(lati,longi).subscribe((response: any) => {
      this.TrucksObj = response;
      console.log(this.TrucksObj);

      this.cityTrucks = this.TrucksObj.businesses;
      if (this.cityTrucks.length == 0) {
        console.log('error, no food trucks here');
        this.filteredTrucks = [];
      }
      else {
        this.city = this.cityTrucks[0].location.city;
        console.log(this.cityTrucks);
        this.filteredTrucks = this.cityTrucks;
/*        console.log(this.filteredTrucks[1].categories[1].title);*/
      }

      this.loadMap();
      

    })
  }

  loadDefaultMap(): any {
    this.getLat = 42.331429;
    this.getLong = -83.045753;
    this.geomapservice.initMap(this.mapElement, this.getLat, this.getLong);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getLong = position.coords.longitude;
        this.getLat = position.coords.latitude;
        this.geomapservice.initMap(this.mapElement, this.getLat, this.getLong);
      });
    }
    else {
      console.log("No support for geolocation")
    }
  }

  getAllPages(bId: string, name: string): void {
    this.passportService.getAllPages().subscribe((response: any) => {
      this.Passport = response;
      this.Passport.forEach(E => {
        if (E.businessId == bId) {
          this.isInPassport = true;
        }
      })
      if (this.isInPassport == false) {
        this.routing.navigate([`/add-page/${bId}/${name}`]);
      }
      else {
        console.log("Already In Passport");
        alert("Already In Passport, Click Ok To Continue.")
      }
      this.isInPassport = false;
    })
  }

  checkInPassport(bId: string): boolean {
    return (this.Passport.filter(P => P.businessId == bId).length > 0);
  }

  buildWishList(bId: string, name: string): void {
    this.wishlistservice.getWishList().subscribe((response: any) => {
      this.WishList = response;
      console.log(response);
      this.WishList.forEach(E => {
        if (E.businessId == bId) {
          this.isInWishList = true;
        }
      })
      if (this.isInWishList == false) {
        this.addToWishList(bId, name);
        alert("Added To Wish List!")
      }
      else {
        console.log("Already In Wish List");
        alert("Already In Wish List, Click Ok To Continue.")
      }
      this.isInWishList = false;
    });
  }

  getLocation(form: NgForm): void {
    console.log('address=', form.form.value.address); 
    this.geomapservice.getGeoLocation(form.form.value.address).subscribe((response: any) => {
      this.geoResults = response;
      console.log('test to check:');
      console.log(this.geoResults);
      this.getLat = this.geoResults.results[0].geometry.location.lat;
      this.getLong = this.geoResults.results[0].geometry.location.lng;

      this.getAllTrucks(this.getLat, this.getLong);
      console.log(this.getLat, this.getLong);
      
    });
  }

  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;

  loadMap = () => {

    
    console.log(this.getLat, this.getLong);

    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.getLat, lng: this.getLong },
      zoom: 12
    });

    console.log(this.cityTrucks.length)
    this.cityTrucks.forEach(T => {
      var marker = new window['google'].maps.Marker({
        position: { lat: T.coordinates.latitude, lng: T.coordinates.longitude },
        map: map,
        title: T.name,
        draggable: true,
        animation: window['google'].maps.Animation.DROP,
      });


      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        `<h3 id="thirdHeading" class="thirdHeading">${T.name}</h3>` +
        '<div id="bodyContent">' +
        `<p>${T.location.address1}</p>` +
        `<p>${T.location.city}, ${T.location.state} ${T.location.zip_code}</p>` +
        `<a target="_blank" rel="noopener noreferrer" href=${T.url}>Link to Yelp!</a>` +
        '</div>' +
        '</div>';

      var infowindow = new window['google'].maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
    })
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

  addToWishList(bid: string, bname:string): void {
    this.wishlistservice.addToWishList(bid,bname).subscribe((response: any) => {
      console.log(response);
      //this.routing.navigate(['/wish-list']);
    });
  }

  filterTrucks(input: string): void {
    this.filteredTrucks = this.cityTrucks.filter(T => T.name.toLowerCase().includes(input.toLowerCase()));
    console.log(this.filteredTrucks);
  }

}
