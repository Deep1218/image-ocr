import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UploadInvoiceComponent } from './pages/upload-invoice/upload-invoice.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceDetailComponent,
    UploadInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
