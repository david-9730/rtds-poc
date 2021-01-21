import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TwitterDashboardComponent } from './twitter-dashboard/twitter-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TwitterDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwitterRouterModule {}
