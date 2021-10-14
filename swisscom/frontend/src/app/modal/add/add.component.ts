import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Feature } from 'src/app/feature.model';
import { FeatureService } from 'src/app/feature.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit,OnDestroy {
  editFeature:Feature;
  customerIds:string="";
  customer:string[]=[];
  editMode=false;
  index:number;
  subscription:Subscription;
  message:string="";
  constructor(private featureService:FeatureService) { }

  ngOnInit(){

    //checking if feature is present for edit
    this.featureService.editFeature.subscribe(response=>{
      this.editFeature=response;
      
      if(response!==null){
        this.customer=response.customerIds;
        this.editMode=true;
      }else{
        this.editMode=false;
      }
      
    });
    
    this.subscription=this.featureService.index.subscribe(index=>this.index=index);
  }

  hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }

  //Add feature if this.editMode is false else Edit feature
  public onAddFeature(form: NgForm) {

      form.value.customerIds=this.customer;
      if(this.editMode===true){
        this.featureService.updateFeature(this.index,form.value,false);
      }
      else{
        form.value.archive=false;
        form.value.inverted=false;
        this.featureService.addFeature(form.value);
        form.reset();
      }
      this.editFeature=null;
      this.customer=[];
    
    
    
  }

  addCustomers(){

    this.customer.push(this.customerIds.trimRight());
    this.customerIds="";  
  }

  removeCustomer(customer:string){
    var index = this.customer.indexOf(customer);
    if (index !== -1) {
      this.customer.splice(index, 1);
    }
    console.log(this.customer);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
