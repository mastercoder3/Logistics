import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AgmCoreModule} from '@agm/core';
import { FilterPipeModule } from 'ngx-filter-pipe';

// FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Material Imports
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './entry/login/login.component';
import { SignupComponent } from './entry/signup/signup.component';
import { CreateNewComponent } from './dashboard/create-new/create-new.component';
import { CreateDialogComponent } from './dashboard/create-dialog/create-dialog.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { TrackingComponent } from './dashboard/tracking/tracking.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { AboutUsComponent } from './dashboard/about-us/about-us.component';
import { ContactUsComponent } from './dashboard/contact-us/contact-us.component';
import { CountriesComponent } from './dashboard/countries/countries.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { ApiService } from './services/api.service';
import { HelperService } from './services/helper.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreateNewComponent,
    CreateDialogComponent,
    SpinnerComponent,
    TrackingComponent,
    OrdersComponent,
    AboutUsComponent,
    ContactUsComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSnackBarModule,
    FilterPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6Mp7CXGfGt5peVHdZaSw8MR7L1BlXKNs',
      libraries: ["places"]
    }),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'signin', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'create-new', component: CreateNewComponent},
      {path: 'orders', component: OrdersComponent, canActivate: [AuthGaurdService]},
      {path: 'tracking', component: TrackingComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'contact-us', component: ContactUsComponent}
    ])
  ],
  providers: [ApiService, HelperService, AuthGaurdService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [CreateDialogComponent, CountriesComponent]
})
export class AppModule { }
