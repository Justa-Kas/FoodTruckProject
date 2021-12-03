import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodTruckService } from '../food-truck.service';
import { FoodTruck, TruckList } from '../TruckList';

@Component({
    selector: 'app-food-trucks',
    templateUrl: './food-trucks.component.html',
    styleUrls: ['./food-trucks.component.css']
})
/** FoodTrucks component*/
export class FoodTrucksComponent {
    /** FoodTrucks ctor */
  constructor(private foodtruckservice: FoodTruckService, private router: ActivatedRoute) {
      //this.getAllTrucks('detroit');

  }

  ngOnInit(): void {
   
    const routeParams = this.router.snapshot.paramMap;
    let getLat: number = Number(routeParams.get("lat"));
    let getLong: number = Number(routeParams.get("lng"));
    this.getAllTrucks(getLat, getLong);
    console.log(getLat);
    console.log(getLong);

  }

  city: string = "";
  //lat: number = 42.331429;
  //long: number = -83.045753;


  TrucksObj: TruckList = {} as TruckList;
  cityTrucks: FoodTruck[] = [];

  getAllTrucks(lati:number, longi : number): void {
    this.foodtruckservice.getCityFoodTrucks(lati,longi).subscribe((response: any) => {
      this.TrucksObj = response;
      console.log(this.TrucksObj);

      this.cityTrucks = this.TrucksObj.businesses;
      this.city = this.cityTrucks[0].location.city;
      console.log(this.cityTrucks);
    })
  }
}
