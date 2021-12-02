import { Component } from '@angular/core';
import { FoodTruckService } from '../food-truck.service';
import { TruckList } from '../TruckList';

@Component({
    selector: 'app-food-trucks',
    templateUrl: './food-trucks.component.html',
    styleUrls: ['./food-trucks.component.css']
})
/** FoodTrucks component*/
export class FoodTrucksComponent {
    /** FoodTrucks ctor */
    constructor(private foodtruckservice : FoodTruckService) {
      this.getAllTrucks('detroit');
  }

  allTrucks: TruckList = {} as TruckList;

  getAllTrucks(city: string): void {
    this.foodtruckservice.getCityFoodTrucks(city).subscribe((response: any) => {
      this.allTrucks = response;
      console.log(this.allTrucks);
    })
  }
}
