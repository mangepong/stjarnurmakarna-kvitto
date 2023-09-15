import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StartComponent } from './start/start.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { KvittoComponent } from './kvitto/kvitto.component';


import { AuthenticationService } from 'src/app/shared/AuthenticationService';
import { Observable } from 'rxjs';


@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['']);
    }
    return true;
  }
}


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'create', component: FormComponent, canActivate:[LoginActivate] },
  { path: 'list', component: ListComponent, canActivate:[LoginActivate] },
  { path: 'update/:refNr', component: UpdateComponent, canActivate:[LoginActivate] },
  { path: 'show/:refNr', component: KvittoComponent, canActivate:[LoginActivate] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
