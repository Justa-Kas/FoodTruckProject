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
  ratingArray: number[] = [];


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
      app.innerHTML = '<h2>Welcome To Your Passport!</h2>' + '<div class="mt-5">' +
        '<img src = "../../assets/images/PassportTruck.png" height = "350" width = "350" />' +
        '</div>';
      this.ratingArray = [];
    }
    else{
      this.onePage = this.Passport[i];
      this.ratingArray = [];
      for (let indexNum: number = 1; indexNum <= this.onePage.rating; indexNum++) {
        this.ratingArray.push(indexNum);
      }
      console.log('rating array');
      console.log(this.ratingArray);
      console.log(this.Passport[i]);
      let passInfo: string = `<h4> ${this.onePage.businessName}</h4>` + `<div class="card text-dark"><img src=${this.onePage.picture} height="200" alt="Edit to add picture" /></div>` + '<hr color=white />' + `<h5>Date Visited: ${this.displayDate()}</h5>` + `<h5>Food Eaten: ${this.onePage.foodEaten}</h5>` +
        `<h5>Experience: ${this.onePage.experience}</h5>`;
        app.innerHTML = passInfo;
    }
  }

  previousPage(i: number): void {
    const app = document.getElementById('page');
    this.pageCounter--;
    if (this.pageCounter == 0) {
      app.innerHTML = '<h2>Welcome To Your Passport!</h2>' + '<div class="mt-5">' +
        '<img src = "../../assets/images/PassportTruck.png" height = "350" width = "350" />' +
        '</div>';
      this.ratingArray = [];
    }
    else {
    this.onePage = this.Passport[i-1];
      console.log(this.Passport[i - 1]);
      this.ratingArray = [];
      for (let indexNum: number = 1; indexNum <= this.onePage.rating; indexNum++) {
        this.ratingArray.push(indexNum);
      }
      console.log('rating array');
      console.log(this.ratingArray);
      let passInfo: string = `<h4> ${this.onePage.businessName}</h4>` + `<div class="card text-dark"><img src=${this.onePage.picture} height="200" alt="Edit to add picture" /></div>` + '<hr color=white />' + `<h5>Date Visited: ${this.displayDate()}</h5>`  + `<h5>Food Eaten: ${this.onePage.foodEaten}</h5>` +
        `<h5>Experience: ${this.onePage.experience}</h5>`;
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
      dateVisited: form.form.value.dateVisited,
      picture: form.form.value.foodPic
    }
    this.passportService.updatePassportPage(this.onePage.businessId, this.onePage.businessName, newPage.rating, newPage.foodEaten, newPage.experience, newPage.dateVisited, newPage.picture).subscribe((response: any) => {
      this.onePage = response;
      console.log(this.onePage);
      this.updatedPage = false;
    })
  }

  resetPage(): void {
    this.updatedPage = !this.updatedPage;
  }



}


