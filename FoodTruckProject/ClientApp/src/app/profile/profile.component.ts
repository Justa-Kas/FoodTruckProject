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
  displayEdit: boolean = false;
  allAllergies: string[] = [];
  Allergies: string = '';
  otherAllergy: string = '';


  ngOnInit(): void {
    this.checkUserID();
    this.Allergies = '';
    console.log(this.allAllergies);
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
    if (form.form.value.dairy == true) {
      this.Allergies += 'Dairy;';
    }
    if (form.form.value.eggs == true) {
      this.Allergies += 'Eggs;';
    }
    if (form.form.value.peanuts == true) {
      this.Allergies += 'Peanuts;';
    }
    if (form.form.value.treenuts == true) {
      this.Allergies += 'Tree Nuts;';
    }
    if (form.form.value.shellfish == true) {
      this.Allergies += 'Shellfish;';
    }
    if (form.form.value.gluten == true) {
      this.Allergies += 'Gluten;';
    }
    if (form.form.value.soy == true) {
      this.Allergies += 'Soy;';
    }

    let Name: string = form.form.value.name;
    /*    let Allergies: string = form.form.value.allergies;*/
    this.otherAllergy = form.form.value.otherAllergies;
    this.Allergies += this.otherAllergy;
    let Diet: string = form.form.value.diet;
    let FoodieRating: number = form.form.value.foodierating;
    let FavFood: string = form.form.value.favfood;

    if (Name == "") {
      Name = this.currentProfile.name;
    }
    if (this.Allergies == "") {
      this.Allergies = this.currentProfile.allergies;
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



    this.profileservice.createProfile(Name, this.Allergies, Diet, FoodieRating, FavFood).subscribe((response: any) => {
      console.log(response);
      this.currentProfile = response;
      this.allAllergies = this.Allergies.split(';');
      console.log('split allergies')
      console.log(this.allAllergies);
      this.routing.navigate(['/user-profile']);
      this.checkUserID();
    });

  }

  displayProfile(): void {
    this.profileservice.getProfile().subscribe((response: any) => {
      this.currentProfile = response;
      console.log(response);
      this.allAllergies = this.currentProfile.allergies.split(';');
    })
  }

  resetForm(): void {
    this.displayEdit = !this.displayEdit;
}

  updateUserProfile(form: NgForm): void {
    console.log('method working')

    if (form.form.value.dairy == true) {
      this.Allergies += 'Dairy;';
    }
    if (form.form.value.eggs == true) {
      this.Allergies += 'Eggs;';
    }
    if (form.form.value.peanuts == true) {
      this.Allergies += 'Peanuts;';
    }
    if (form.form.value.treenuts == true) {
      this.Allergies += 'Tree Nuts;';
    }
    if (form.form.value.shellfish == true) {
      this.Allergies += 'Shellfish;';
    }
    if (form.form.value.gluten == true) {
      this.Allergies += 'Gluten;';
    }
    if (form.form.value.soy == true) {
      this.Allergies += 'Soy;';
    }

    let Name: string = form.form.value.name;
    /*    let Allergies: string = form.form.value.allergies;*/
    this.otherAllergy = form.form.value.otherAllergies;
    this.Allergies += this.otherAllergy;
    let Diet: string = form.form.value.diet;
    let FoodieRating: number = form.form.value.foodierating;
    console.log(FoodieRating);
    let FavFood: string = form.form.value.favfood;

    if (Name == "") {
      Name = this.currentProfile.name;
    }
    if (this.Allergies == "") {
      this.Allergies = this.currentProfile.allergies;
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

    this.profileservice.updateProfile(Name, this.Allergies, Diet, FoodieRating, FavFood).subscribe((response: any) => {
      console.log('update working');
      this.currentProfile = response;
      this.allAllergies = this.Allergies.split(';');
      console.log('split allergies')
      console.log(this.allAllergies);
      console.log(response);
      this.displayEdit = false;
      //this.routing.navigate(['/user-profile']);
    });
  }
}
