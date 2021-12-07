import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  getProfile(): any {
    return this.http.get(this.baseUrl + 'api/UserProfile/profile');
  }

  createProfile(_name: string, _allergies: string, _diet: string, _foodieRating: number, _favFood: string): any {
    return this.http.post(this.baseUrl + `api/UserProfile/new_profile?name=${_name}&allergies=${_allergies}&diet=${_diet}&foodieRating=${_foodieRating}&favFood=${_favFood}`, {});
  }

  checkUser(uid: string): any {
    return this.http.get(this.baseUrl + `api/UserProfile/isUser?userid=${uid}`);
  }
}
