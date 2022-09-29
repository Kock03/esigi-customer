import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenComponent } from './components/validate-token/validate-token.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente/lista',
    pathMatch: 'full',
  },
  {
    path: 'validate/:id',
    component: ValidateTokenComponent,
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
