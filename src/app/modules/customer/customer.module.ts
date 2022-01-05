import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerRegisterTabComponent } from './customer-create/customer-register-tab/customer-register-tab.component';
import { CustomerContactTabComponent } from './customer-create/customer-contact-tab/customer-contact-tab.component';
import { CustomerContractTabComponent } from './customer-create/customer-contract-tab/customer-contract-tab.component';

const routes: Routes = [
  {
    path: 'novo',
    component: CustomerCreateComponent,
  },
];

@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerRegisterTabComponent,
    CustomerContactTabComponent,
    CustomerContractTabComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  entryComponents: [
    CustomerRegisterTabComponent,
    CustomerContactTabComponent,
    CustomerContractTabComponent,
  ]
})
export class CustomerModule {}
