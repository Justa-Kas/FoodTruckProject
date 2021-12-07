import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Profile } from '../Profile';
import { UserProfileService } from '../user-profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
/** Profile component*/
export class ProfileComponent {
    /** Profile ctor */
  constructor(private profileservice: UserProfileService, private authorizeservice: AuthorizeService, private routing: Router) {

  }

  currentProfile: Profile = {} as Profile;
  public userID: string = '';
  public profileExists: boolean = true;


  ngOnInit(): void {
    this.checkUserID();
  }

  checkUserID(): void {
    this.authorizeservice.getUser().subscribe((response: any) => {
      console.log(response.sub);
      this.userID = response.sub;
      console.log(this.userID);
      this.profileservice.checkUser(this.userID).subscribe((result: any) => {
        this.profileExists = result;
        console.log('checkUser working: ' + result);
        if (this.profileExists) {
          this.displayProfile();
        }
      });
    });
  }

  createNewProfile(form: NgForm): void {
    let Name: string = form.form.value.name;
    let Allergies: string = form.form.value.allergies;
    let Diet: string = form.form.value.diet;
    let FoodieRating: number = form.form.value.foodierating;
    let FavFood: string = form.form.value.favfood;

    this.profileservice.createProfile(Name, Allergies, Diet, FoodieRating, FavFood).subscribe((response: any) => {
      console.log(response);
      this.routing.navigate(['/user-profile']);
    });

  }

  displayProfile(): void {
    this.profileservice.getProfile().subscribe((response: any) => {
      this.currentProfile = response;
      console.log(response);
      console.log(response.faveFood)
    })
  }
}
