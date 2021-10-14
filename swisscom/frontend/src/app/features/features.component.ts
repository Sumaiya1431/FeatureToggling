import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Input, OnChanges,SimpleChanges, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Feature } from '../feature.model';
import { FeatureService } from '../feature.service';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit,OnDestroy{
  features:Feature[];
  subscription:Subscription;

  constructor(private featureService:FeatureService){
  }

  ngOnInit(){
    //get features from service 
    this.subscription= this.featureService.featuresChanged
      .subscribe((features:Feature[])=>this.features=features);
    this.features=this.featureService.getAllFeatures();
  }

  //saving feature in service so modal should be filled when clicked on edit
  onEdit(index:number,feature:Feature){
    this.featureService.editFeature.next(feature);
    this.featureService.index.next(index);
    this.featureService.onOpenModal();
  }
 
  //setting feature as archive
  moveToArchive(index:number,feature:Feature){
    feature.archive=true;
    this.featureService.updateFeature(index,feature,true); 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
