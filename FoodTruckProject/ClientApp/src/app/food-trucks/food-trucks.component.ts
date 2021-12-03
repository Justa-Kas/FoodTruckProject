import { Component } from '@angular/core';
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
    constructor(private foodtruckservice : FoodTruckService) {
      //this.getAllTrucks('detroit');
  }

  ngOnInit(): void {
    this.getAllTrucks(this.city);
  }


  city: string = 'detroit';


  TrucksObj: TruckList = {} as TruckList;
  cityTrucks: FoodTruck[] = [];

  getAllTrucks(city: string): void {
    this.foodtruckservice.getCityFoodTrucks(city).subscribe((response: any) => {
      this.TrucksObj = response;
      console.log(this.TrucksObj);

      this.cityTrucks = this.TrucksObj.businesses;
      console.log(this.cityTrucks);
    })
  }
}
