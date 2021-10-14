import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Feature } from '../feature.model';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'app-archived-features',
  templateUrl: './archived-features.component.html',
  styleUrls: ['./archived-features.component.css']
})
export class ArchivedFeaturesComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  features:Feature[];
  constructor(private featureService:FeatureService) { }

  ngOnInit(){
    //get archived feature
    this.subscription= this.featureService.featuresArchivedChanged
      .subscribe((features:Feature[])=>this.features=features);
    this.features=this.featureService.getArchiveFeatures();
  }

  //unarchiving feature
  moveToFeatures(index:number,feature:Feature){
    feature.archive=false;
    this.featureService.updateFeature(index,feature,true);
   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
