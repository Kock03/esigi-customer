import { MatTableModule } from '@angular/material/table';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ValidateTokenComponent } from './components/validate-token/validate-token.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, SnackBarComponent, ValidateTokenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    MatSelectCountryModule.forRoot('br'),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient],
      },
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    ConfirmDialogModule,
    MatSnackBarModule,

  ],
  providers: [SnackBarService, ConfirmDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}