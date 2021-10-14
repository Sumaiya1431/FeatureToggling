import { Injectable } from "@angular/core";  
import { CanActivate} from "@angular/router";  
import { FeatureService } from '../feature.service';
import { Observable } from "rxjs";

@Injectable()  
export class AuthenticationGuard implements CanActivate  {  
      
constructor(private featureService: FeatureService){}  
  
  
    canActivate() : Observable<boolean>|boolean {  
          
        return this.featureService.isLoggedIn;

    }  
}  