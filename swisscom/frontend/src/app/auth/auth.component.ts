import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FeatureService } from '../feature.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private featureService:FeatureService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    const email=form.value.username;
    const password=form.value.password;
    const status=this.featureService.onLogin(email,password);
    if(status){
      this.featureService.enableLogout.next(true);
      this.router.navigate(['/enable']);
    }
    else{
      alert("wrong credentials")
    }
  }
}
