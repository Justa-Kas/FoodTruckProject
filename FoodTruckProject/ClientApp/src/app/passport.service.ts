import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassportService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private httpservice: HttpClient) {

  }

  getAllPages(): any {
   return this.httpservice.get(this.baseUrl + 'api/PassportPage/allPages');
  }

  addPassportPage(_businessId: string, _businessName: string, _rating: number, _fEaten: string, _experience: string, _date: Date, _foodPic: string): any {
    return this.httpservice.post(this.baseUrl + `api/PassportPage/addPassportPage?businessId=${_businessId}&businessName=${_businessName}&rating=${_rating}&foodEaten=${_fEaten}&experience=${_experience}&dateVisited=${_date}&foodPic=${_foodPic}`, {});
  }

  deletePassportPage(id: number): any {
    return this.httpservice.delete(this.baseUrl + `api/PassportPage/DeletePassportPage/${id}`);
  }

  getPagesByDateVisited(dateVisited: Date): any {
    return this.httpservice.get(this.baseUrl + `api/PassportPage/date/${dateVisited}`);
  }

  updatePassportPage(_businessId: string, _businessName: string, _rating: number, _fEaten: string, _experience: string, _date: Date, _foodPic: string): any {
    return this.httpservice.put(this.baseUrl + `api/PassportPage/editPage?businessId=${_businessId}&businessName=${_businessName}&rating=${_rating}&foodEaten=${_fEaten}&experience=${_experience}&dateVisited=${_date}&foodPic=${_foodPic}`, {});
  }

}

