import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject} from 'rxjs';
import { Feature } from './feature.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService implements OnInit{
  featuresChanged=new Subject<Feature[]>();
  enableLogout=new Subject<boolean>();
  index=new Subject<number>();
  featuresArchivedChanged=new Subject<Feature[]>();
  searchFeature:Feature[];
  searchArchFeature:Feature[];
  features:Feature[]=[];
  archivedFeatures:Feature[]=[];
  apiServerUrl = environment.apiBaseUrl;
  editFeature=new Subject<Feature>();
  isLoggedIn=false;
  username='sumaiya';
  password='1234';
  
  constructor(private http:HttpClient) { }

  ngOnInit(){
  }

  //Modal Creation for Add and Edit feature
  public onOpenModal() {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addEditFeatureModal');
    container.appendChild(button);
    button.click();
  }
  
  setFeatures(features: Feature[],archive:boolean){
    if(archive===true){
      this.archivedFeatures=features
      this.featuresArchivedChanged.next(this.archivedFeatures.slice())
    }
    else{
      this.features=features
      this.featuresChanged.next(this.features.slice())
    }
    
  }

  onLogin(username:string,password:string){
     if(username===this.username && password===this.password){
       this.isLoggedIn=true;
       return true
     }
     else{
       this.isLoggedIn=true;
       return false;
     }
  }

  getAllFeatures(){
    return this.features.slice();
  }

  getArchiveFeatures(){
    return this.archivedFeatures.slice();
  }
  
  searchEmployees(archive:boolean,key: string): Feature[] {
    const results: Feature[] = [];
    let features:Feature[]=[];
    
    if(archive===true){
      features=this.searchArchFeature;
    }
    else
      features=this.searchFeature;

    for (const feature of features) {
      //search with techinal name or display name
      if (feature.displayName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || feature.technicalName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(feature);
      }
    }
    return results;
  }
 
//get features from api
  public getFeatures(archive:boolean){
    this.http.get<Feature[]>(`${this.apiServerUrl}/feature/find/features/${archive}`)
    .subscribe( response=>
      {
        this.setFeatures(response,archive);
        if(archive==false)
          this.searchFeature=response;
        else
          this.searchArchFeature=response
      });
    
  }

  //create new feature
  public addFeature(feature:Feature)
  {
    this.http.post<Feature>(`${this.apiServerUrl}/feature/add`,feature).subscribe(
      (response: Feature) => {
        this.features.push(response);
        this.featuresChanged.next(this.features.slice())
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //update features 
  public updateFeature(index:number,feature:Feature,archiveMove:boolean){
    this.http.put<Feature>(`${this.apiServerUrl}/feature/update`,feature).subscribe(
      (response: Feature) => {
        //update archive property 
      if(archiveMove==true){
        if(response.archive===true){
          this.features.splice(index,1)
          this.featuresChanged.next(this.features.slice());
          this.archivedFeatures.push(feature);
          this.featuresArchivedChanged.next(this.archivedFeatures.slice())
        }else{
          this.features.push(feature);
          this.featuresChanged.next(this.features.slice())
          this.archivedFeatures.splice(index,1)
          this.featuresArchivedChanged.next(this.archivedFeatures.slice())
        }
      }
      //update feature
      else{
        this.features[index]=feature;
        this.featuresChanged.next(this.features.slice())
      }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
   
  }

}
