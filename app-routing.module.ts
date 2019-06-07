import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as guard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service'

const routes: Routes = [
    { path: 'secret', canActivate: [guard], loadChildren: './secret/secret.module#SecretModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: '', redirectTo: 'secret', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [ guard, AuthService ],
  exports: [RouterModule]
})

export class AppRoutingModule { }