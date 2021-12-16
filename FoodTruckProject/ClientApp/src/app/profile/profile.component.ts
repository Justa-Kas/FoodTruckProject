import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { PassportService } from '../passport.service';
import { passportPage } from '../passportPage';
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
  constructor(private profileservice: UserProfileService, private authorizeservice: AuthorizeService, private routing: Router, private passportservice: PassportService) {

  }

  userPassport: passportPage[] = [];
  currentProfile: Profile = {} as Profile;
  public userID: string = '';
  public profileExists: boolean = true;
  displayEdit: boolean = false;
  allAllergies: string[] = [];
  Allergies: string = '';
  otherAllergy: string = '';
  FoodieRating: number = 0;
  public userName: Observable<string>;


  ngOnInit(): void {
    this.checkUserID();
    this.Allergies = '';
    this.userName = this.authorizeservice.getUser().pipe(map(u => u && u.name));
  }

  checkUserID(): void {
    this.authorizeservice.getUser().subscribe((response: any) => {
      this.userID = response.sub;
      this.profileservice.checkUser(this.userID).subscribe((result: any) => {
        this.profileExists = result;
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
    this.otherAllergy = form.form.value.otherAllergies;
    this.Allergies += this.otherAllergy;
    let Diet: string = form.form.value.diet;
    let FavFood: string = form.form.value.favfood;

    if (this.Allergies == "") {
      this.Allergies = this.currentProfile.allergies;
    }
    this.FoodieRating = this.userPassport.length;
    



    this.profileservice.createProfile(Name, this.Allergies, Diet, this.FoodieRating, FavFood).subscribe((response: any) => {
      this.currentProfile = response;
      this.allAllergies = this.Allergies.split(';');
      this.routing.navigate(['/user-profile']);
      this.checkUserID();
    });

  }

  displayProfile(): void {
    this.profileservice.getProfile().subscribe((response: any) => {
      this.passportservice.getAllPages().subscribe((response: any) => {
        this.userPassport = response;
        console.log(response);
        this.FoodieRating = this.userPassport.length;
        console.log(this.FoodieRating);
      });
      this.currentProfile = response;
      this.allAllergies = this.currentProfile.allergies.split(';');
      
    });
  }

  resetForm(): void {
    this.displayEdit = !this.displayEdit;
}

  updateUserProfile(form: NgForm): void {

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
    this.otherAllergy = form.form.value.otherAllergies;
    this.Allergies += this.otherAllergy;
    let Diet: string = form.form.value.diet;
    this.FoodieRating = this.userPassport.length;
    let FavFood: string = form.form.value.favfood;

    if (this.Allergies == "") {
      this.Allergies = this.currentProfile.allergies;
    }

    this.profileservice.updateProfile(Name, this.Allergies, Diet, this.FoodieRating, FavFood).subscribe((response: any) => {
      this.currentProfile = response;
      this.allAllergies = this.Allergies.split(';');
      this.displayEdit = false;
    });
  }
}
