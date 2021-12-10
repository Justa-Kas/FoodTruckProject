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
  allAllergies: string[] = [];
  public userID: string = '';
  public profileExists: boolean = true;
  displayEdit: boolean = false;


  ngOnInit(): void {
    this.checkUserID();
  }

  checkUserID(): void {
    this.authorizeservice.getUser().subscribe((response: any) => {
      this.userID = response.sub;
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
      this.checkUserID();
    });

  }

  displayProfile(): void {
    this.profileservice.getProfile().subscribe((response: any) => {
      this.currentProfile = response;
      console.log(response);
    })
  }

  resetForm(): void {
    this.displayEdit = !this.displayEdit;
}

  updateUserProfile(form: NgForm): void {
    console.log('method working')
    //let Allergies: string = '';
    //if (form.form.value.dairy == true) {
    //  Allergies += 'Dairy;';
    //  console.log(Allergies);
    //}
    let Name: string = form.form.value.name;
    let Allergies: string = form.form.value.allergies;
    let Diet: string = form.form.value.diet;
    let FoodieRating: number = form.form.value.foodierating;
    console.log(FoodieRating);
    let FavFood: string = form.form.value.favfood;

    if (Name == "") {
      Name = this.currentProfile.name;
    }
    if (Allergies == "") {
      Allergies = this.currentProfile.allergies;
    }
    if (Diet == "") {
      Diet = this.currentProfile.diet;
    }
    if (!FoodieRating) {
      FoodieRating = this.currentProfile.foodieRating;
    }
    if (FavFood == "") {
      FavFood = this.currentProfile.faveFood;
    }

    /*this.allAllergies = this.currentProfile.allergies.split(';');*/

    this.profileservice.updateProfile(Name, Allergies, Diet, FoodieRating, FavFood).subscribe((response: any) => {
      console.log('update working');
      this.currentProfile = response;
      console.log(response);
      this.displayEdit = false;
      //this.routing.navigate(['/user-profile']);
    });
  }
}
