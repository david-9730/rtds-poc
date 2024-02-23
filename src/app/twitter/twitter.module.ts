import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitterDashboardComponent } from './twitter-dashboard/twitter-dashboard.component';
import { TwitterRouterModule } from './twitter-routing.module';
import { reducer } from './state/twitter.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TwitterEffects } from './state/twitter.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TwitterDashboardComponent],
  imports: [
    CommonModule,
    TwitterRouterModule,
    StoreModule.forFeature('twitter', reducer),
    EffectsModule.forFeature([TwitterEffects]),
    StoreDevtoolsModule.instrument(),
    ReactiveFormsModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class TwitterModule { }
