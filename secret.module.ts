import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretComponent } from './secret.component'
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data/data.component';
import { FotosComponent } from './fotos/fotos.component';

const secretRoutes: Routes = [
    {
        path: '', component: SecretComponent, children: [
            { path: 'data', component: DataComponent },
            { path: 'fotos', component: FotosComponent },
            { path: '', redirectTo: 'data', pathMatch: 'full' }
        ]
    }
];

@NgModule({
  declarations: [
      SecretComponent,
      DataComponent,
      FotosComponent,
  ],
  exports: [],
  imports: [
      CommonModule,
      RouterModule.forChild(secretRoutes),
  ]
})

export class SecretModule { }