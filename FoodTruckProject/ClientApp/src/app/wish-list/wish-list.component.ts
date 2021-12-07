import { Component } from '@angular/core';
import { FoodTruckService } from '../food-truck.service';
import { passportPage } from '../passportPage';
import { FoodTruck } from '../TruckList';
import { WishListService } from '../wish-list.service';
import { WishListItem } from '../WishList';

@Component({
    selector: 'app-wish-list',
    templateUrl: './wish-list.component.html',
    styleUrls: ['./wish-list.component.css']
})
/** WishList component*/
export class WishListComponent {
    /** WishList ctor */
    constructor(private wishlistservice:WishListService, private foodtruckservice:FoodTruckService) {

  }
  ngOnInit(): void{

    this.buildWishList();
}

  WishList: WishListItem[] = [];
  TruckItems: FoodTruck[] = [];
  foodTruck: FoodTruck = {} as FoodTruck;
  
  deleteFromWishList(id: number): void {
    this.wishlistservice.removeFromWishList(id).subscribe((response: any) => {
      console.log(response);
      this.buildWishList();
    });
  }

  buildWishList(): void {
    this.wishlistservice.getWishList().subscribe((response: any) => {
      this.WishList = response;
      console.log(response);
      this.getAllTruckDetails();
    });
  }

  getAllTruckDetails(): void {
    
    for (let i = 0; i < this.WishList.length; i++) {
      this.foodtruckservice.getTruckDetails(this.WishList[i].businessId).subscribe((response: any) => {
        this.foodTruck = response;
        console.log(response);
        this.TruckItems.push(this.foodTruck);
       //console.log(this.TruckItems);
      });
    }
    
  }
}
