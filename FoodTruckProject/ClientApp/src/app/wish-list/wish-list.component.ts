import { Component } from '@angular/core';
import { passportPage } from '../passportPage';
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
    constructor(private wishlistservice:WishListService) {

  }
  ngOnInit(): void{
    this.displayWishList();
}

  WishList: WishListItem[] = [];
  
  deleteFromWishList(id: number): void {
    this.wishlistservice.removeFromWishList(id).subscribe((response: any) => {
      console.log(response);
    });
  }

  displayWishList(): void {
    this.wishlistservice.getWishList().subscribe((response: any) => {
      this.WishList = response;
      console.log(response);
    });
  }
}
