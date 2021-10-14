import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchivedFeaturesComponent } from './archived-features/archived-features.component';
import { AppRoutingModule } from './app-routing.module';
import { FeaturesComponent } from './features/features.component';
import { EnableFeatureComponent } from './enable-feature/enable-feature.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationGuard } from "./auth/auth.guard";
import { AddComponent } from './modal/add/add.component'

@NgModule({
  declarations: [
    AppComponent,
    ArchivedFeaturesComponent,
    FeaturesComponent,
    EnableFeatureComponent,
    AuthComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,AppRoutingModule,ReactiveFormsModule
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
