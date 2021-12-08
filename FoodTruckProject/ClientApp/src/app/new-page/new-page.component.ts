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

  public Passport: passportPage[] = [];
  isInPassport: boolean = false;

  getAllPages(): void {
    this.passportService.getAllPages().subscribe((response: any) => {
      this.Passport = response;

    })
  }

  addPassportPage(form: NgForm): void {
    const routeParams = this.router.snapshot.paramMap;
    let bId: string = String(routeParams.get("bid"));
    let bName: string = String(routeParams.get("bname"));

    this.Passport.forEach(E => {
      if (E.businessId == bId) {
        this.isInPassport = true;
      }
    })


    let newPage: passportPage = {
      id: 0,
      businessId: bId,
      businessName: bName,
      userId: "",
      rating: form.form.value.rating,
      foodEaten: form.form.value.foodEaten,
      experience: form.form.value.experience,
      dateVisited: form.form.value.dateVisited
    }
    this.passportService.addPassportPage(newPage.businessId, newPage.businessName, newPage.rating, newPage.foodEaten, newPage.experience, newPage.dateVisited).subscribe((response: any) => {
      //this.newPage = response;

    })
    /*this.routing.navigate(['/passport']);*/
  }
}
