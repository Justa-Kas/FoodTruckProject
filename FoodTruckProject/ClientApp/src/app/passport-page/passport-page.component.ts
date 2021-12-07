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
    this.getAllPages();
    this.pageCounter = 0;
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
  onePage: passportPage = {} as passportPage;
  pageCounter: number = 0;

  deletePassportPage(id: number): void {
    this.passportService.deletePassportPage(id).subscribe((response: any) => {
      this.getAllPages();
    })
  }

  forwardPage(i: number): void {
    const app = document.getElementById('page');
    this.pageCounter++;
    if (this.pageCounter == 0) {
      app.innerHTML = '<h4>Welcome To Your Passport</h4>';
    }
    else{
    this.onePage = this.Passport[i];
    console.log(this.Passport[i]);
    let passInfo: string = `<h4> ${this.onePage.businessName}</h4>` + `<h5> ${this.onePage.rating}</h5>` + `<h5> ${this.onePage.foodEaten}</h5>` +
      `<h5> ${this.onePage.experience}</h5>` + `<h5> ${this.onePage.dateVisited}</h5>`;
    app.innerHTML = passInfo;
    }
  }

  previousPage(i: number): void {
    const app = document.getElementById('page');
    this.pageCounter--;
    if (this.pageCounter == 0) {
      app.innerHTML = '<h4>Welcome To Your Passport</h4>';
    }
    else {
    this.onePage = this.Passport[i-1];
    console.log(this.Passport[i-1]);
    let passInfo: string = `<h4> ${this.onePage.businessName}</h4>` + `<h5> ${this.onePage.rating}</h5>` + `<h5> ${this.onePage.foodEaten}</h5>` +
      `<h5> ${this.onePage.experience}</h5>` + `<h5> ${this.onePage.dateVisited}</h5>`;
    app.innerHTML = passInfo;
    }
  }
}
