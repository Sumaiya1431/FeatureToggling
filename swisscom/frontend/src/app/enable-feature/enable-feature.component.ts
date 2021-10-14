import { Component, OnDestroy, OnInit } from '@angular/core';
import { Feature } from '../feature.model';
import { FeatureService } from '../feature.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enable-feature',
  templateUrl: './enable-feature.component.html',
  styleUrls: ['./enable-feature.component.css']
})
export class EnableFeatureComponent implements OnInit,OnDestroy {
  features:Feature[];
  subscription:Subscription;
  constructor(private featureService:FeatureService) { }

  ngOnInit(){
    //get features to display
    this.subscription= this.featureService.featuresChanged
      .subscribe((features:Feature[])=>this.features=features);
    this.features=this.featureService.getAllFeatures();
  }

  //Invert Feature
  invertFeature(index:number,feature:Feature){
    if(feature.inverted){
      feature.inverted=false;
    }
    else{
      feature.inverted=true;
    }
    this.featureService.updateFeature(index,feature,false)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
