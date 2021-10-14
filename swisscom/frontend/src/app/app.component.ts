import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Feature } from './feature.model';
import { FeatureService } from './feature.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  archive=false;
  customerIds="";
  enable:Boolean;
  customer:string[]=[];
  features:Feature[];
  subscription:Subscription;
  showSearch=true;
  setTitle:string;
  constructor(private featureService:FeatureService,private router:Router,private route:ActivatedRoute){
  }

  ngOnInit(){
    //Enabling Logout button
    this.subscription= this.featureService.enableLogout
      .subscribe((enable:Boolean)=>this.enable=enable)
    //fetching features from backend which are not archived
    this.featureService.getFeatures(false);
    //fetching features from backend which are archived
    this.featureService.getFeatures(true);
    
  }

  //Search the features
  searchFeatures(key: string) {
    if(this.archive===false){
      this.features=this.featureService.searchEmployees(false,key);
      this.featureService.setFeatures(this.features,false);
    }else{
      this.features=this.featureService.searchEmployees(true,key);
      this.featureService.setFeatures(this.features,true);
    }
  }
  
  //To Open Modal when clicked on Add Features
  onAdd(){
    this.customer=[];
    this.featureService.editFeature.next(null);
    this.featureService.onOpenModal();
  }

  //Logging out
  onLogOut(){
    // this.enable=false;
    this.showSearch=true;
    this.featureService.enableLogout.next(false);
    this.router.navigate(['/']);
  }

  //Show faetures for Enabling
  enableFeatures(){
    this.showSearch=true;
    this.archive=false;
    this.router.navigate(['/enable']);
  }
  
  //on move to archive
  goToArchive(){
    this.showSearch=true;
    this.archive=true;
    this.router.navigate(['/archived']);
  }

  //on login
  login(){
    this.showSearch=false;
    this.router.navigate(['/auth']);
  }

  //show features when movinf between archive and features
  onFeature(){
    this.archive=false;
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
