import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { FoodTrucksComponent } from './food-trucks/food-trucks.component';
import { PassportPageComponent } from './passport-page/passport-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FoodTrucksComponent,
    NewPageComponent,
    PassportPageComponent,
    WishListComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'food-trucks', component: FoodTrucksComponent },
      { path: 'passport', component: PassportPageComponent, canActivate: [AuthorizeGuard] },
      { path: 'add-page/:bid/:bname', component: NewPageComponent },
      { path: 'wish-list', component: WishListComponent, canActivate: [AuthorizeGuard] },
      { path: 'user-profile', component: ProfileComponent, canActivate: [AuthorizeGuard] }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
