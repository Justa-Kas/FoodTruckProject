import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PassportService } from '../passport.service';
import { passportPage } from '../passportPage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-page',
    templateUrl: './new-page.component.html',
    styleUrls: ['./new-page.component.css']
})
/** newPage component*/
export class NewPageComponent {
    /** newPage ctor */
    constructor(private passportService: PassportService, private router: ActivatedRoute, private routing: Router ) {

  }

  routeParams = this.router.snapshot.paramMap;
  bId: string = String(this.routeParams.get("bid"));
  bName: string = String(this.routeParams.get("bname"));


  addPassportPage(form: NgForm): void {

    console.log(form.form.value.dateVisited);

    if (form.form.value.dateVisited != "") {
      let newPage: passportPage = {
        id: 0,
        businessId: this.bId,
        businessName: this.bName,
        userId: "",
        rating: form.form.value.rating,
        foodEaten: form.form.value.foodEaten,
        experience: form.form.value.experience,
        dateVisited: form.form.value.dateVisited,
        picture: form.form.value.foodPic
      }
      this.passportService.addPassportPage(newPage.businessId, newPage.businessName, newPage.rating, newPage.foodEaten, newPage.experience, newPage.dateVisited, newPage.picture).subscribe((response: any) => {
        this.routing.navigate(['/passport']);
      })
    }
    else {
      alert('Please enter a date!');
    }
    
  }
}
