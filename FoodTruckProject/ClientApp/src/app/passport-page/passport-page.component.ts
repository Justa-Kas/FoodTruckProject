import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private passportService: PassportService, private router: ActivatedRoute, private routing: Router) {

  }

  public Passport: passportPage[] = [];
  newPage: passportPage = {} as passportPage;
  updatedPage: boolean = false;
  Truck: FoodTruck = {} as FoodTruck;
  onePage: passportPage = {} as passportPage;
  pageCounter: number = 0;

  ngOnInit(): void {
    this.getAllPages();
    this.pageCounter = 0;
  }


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

  //Check if needed to delete - admin function?
  deletePassportPage(id: number): void {
    this.passportService.deletePassportPage(id).subscribe((response: any) => {
      this.getAllPages();
    })
  }


  displayDate(): string {
    let index: number = (this.onePage.dateVisited + "").indexOf("T");
    let dateOf = (this.onePage.dateVisited + "").substring(0, index);
   /* let time = (this.onePage.dateVisited + "").substring(index + 1);*/
    //console.log(time);

    return dateOf;
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
      `<h5> ${this.onePage.experience}</h5>` + `<h5> ${this.displayDate()}</h5>`;
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
      `<h5> ${this.onePage.experience}</h5>` + `<h5> ${this.displayDate()}</h5>`;
    app.innerHTML = passInfo;
    }
  }

  editPassportPage(form: NgForm): void {

    let newPage: passportPage = {
      id: 0,
      businessId: "",
      businessName: "",
      userId: "",

      rating: form.form.value.rating,
      foodEaten: form.form.value.foodEaten,
      experience: form.form.value.experience,
      dateVisited: form.form.value.dateVisited
    }
    this.passportService.updatePassportPage(this.onePage.businessId, this.onePage.businessName, newPage.rating, newPage.foodEaten, newPage.experience, newPage.dateVisited).subscribe((response: any) => {
      this.onePage = response;
      console.log(this.onePage);
      //this.Passport.push(this.onePage);
      this.updatedPage = false;
      //this.forwardPage(this.pageCounter--);
    })
  }

  resetPage(): void {
    this.updatedPage = !this.updatedPage;
  }


}


