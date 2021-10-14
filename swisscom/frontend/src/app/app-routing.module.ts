import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArchivedFeaturesComponent } from "./archived-features/archived-features.component";
import { FeaturesComponent } from "./features/features.component";
import { EnableFeatureComponent } from "./enable-feature/enable-feature.component";
import { AuthenticationGuard } from "./auth/auth.guard"
import { AuthComponent } from "./auth/auth.component";
const appRoutes:Routes = [
    {path:'',redirectTo:'/features',pathMatch:'full'},
    {path:'features',component:FeaturesComponent},
    {path:'archived',component:ArchivedFeaturesComponent},
    {path:'auth',component:AuthComponent},
    {path:'enable',component:EnableFeatureComponent,
    canActivate : [AuthenticationGuard]
    },
    
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}