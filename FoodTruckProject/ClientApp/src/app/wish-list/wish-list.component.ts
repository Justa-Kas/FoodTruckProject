import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTruckService } from '../food-truck.service';
import { PassportService } from '../passport.service';
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
    constructor(private wishlistservice:WishListService, private foodtruckservice:FoodTruckService, private routing: Router, private passportService: PassportService) {

  }

  Passport: passportPage[] = [];
  WishList: WishListItem[] = [];
  TruckItems: FoodTruck[] = [];
  indexNum: number = 0;
  foodTruck: FoodTruck = {} as FoodTruck;
  isInPassport: boolean = false;

  ngOnInit(): void{
    this.buildWishList();
    this.isInPassport = false;
}

  deleteFromWishList(id: string): void {
    this.wishlistservice.removeFromWishList(id).subscribe((response: any) => {
      console.log(response);
    //  for (let i = 0; i < this.WishList.length; i++) {
        this.indexNum = this.TruckItems.findIndex(w => (w.id == id));
     // }
      this.TruckItems.splice(this.indexNum, 1);
      console.log(this.TruckItems);
    });
  }

  buildWishList(): void {
    this.wishlistservice.getWishList().subscribe((response: any) => {
      this.WishList = response;
      console.log(response);
      this.getAllTruckDetails();
    });
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
