import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StartComponent } from './start/start.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { KvittoComponent } from './kvitto/kvitto.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: 'list', component: ListComponent },
  { path: 'update/:refNr', component: UpdateComponent },
  { path: 'show/:refNr', component: KvittoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
