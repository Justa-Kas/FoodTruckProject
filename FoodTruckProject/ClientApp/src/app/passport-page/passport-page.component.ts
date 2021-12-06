import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PassportService } from '../passport.service';
import { passportPage } from '../passportPage';
import { FoodTruck } from '../TruckList';

@Component({
    selector: 'app-passport-page',
    templateUrl: './passport-page.component.html',
    styleUrls: ['./passport-page.component.css']
})
/** passportPage component*/
export class PassportPageComponent {
    /** passportPage ctor */
  constructor(private passportService: PassportService, private router: ActivatedRoute) {

  }
  ngOnInit(): void {

  }

  Passport: passportPage[] = [];
  newPage: passportPage = {} as passportPage;

  getAllPages(): void {
    this.passportService.getAllPages().subscribe((response: any) => {
      this.Passport = response;

    })
  }

  getPagesByDateVisited(date: Date): any {
    this.passportService.getPagesByDateVisited(date).subscribe((response: any) => {
      this.newPage = response;
    })
  }
  Truck: FoodTruck = {} as FoodTruck;

  

  deletePassportPage(id: number): void {
    this.passportService.deletePassportPage(id).subscribe((response: any) => {
      this.getAllPages();
    })
  }
}
