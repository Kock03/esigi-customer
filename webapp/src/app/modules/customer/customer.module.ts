
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table'  
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import {MatSelectModule} from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { MatSortModule } from '@angular/material/sort';



import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerRegisterTabComponent } from './customer-create/customer-register-tab/customer-register-tab.component';
import { CustomerContactTabComponent } from './customer-create/customer-contact-tab/customer-contact-tab.component';
import { CustomerContractTabComponent } from './customer-create/customer-contract-tab/customer-contract-tab.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerContactDialog } from './customer-create/customer-contact-tab/customer-contact-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: 'lista',
    component: CustomerListComponent,
  },
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
    CustomerListComponent,
    CustomerContactDialog
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
    NgxMaskModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,  
    MatSortModule,
    MatDialogModule,

    
  ],
  entryComponents: [
    CustomerListComponent,
    CustomerRegisterTabComponent,
    CustomerContactTabComponent,
    CustomerContractTabComponent,
    CustomerRegisterTabComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerModule {}
