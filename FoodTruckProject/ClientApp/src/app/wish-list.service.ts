import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { passportPage } from './passportPage';

@Injectable({
  providedIn: 'root'
})

export class WishListService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private httpservice: HttpClient) {

  }
  

  getWishList(): any {
    return this.httpservice.get(this.baseUrl + 'api/WishList/wishlist');
  }

  addToWishList(bid: string, bname: string): any {
    return this.httpservice.post(this.baseUrl + `api/WishList/addToWishList?businessId=${bid}&businessName=${bname}`, {})
  }

  removeFromWishList(id: number): any {
    return this.httpservice.delete(this.baseUrl + `api/WishList/deleteFromWishList/${id}`)
  }
}
