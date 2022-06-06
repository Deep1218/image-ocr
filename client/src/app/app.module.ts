import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UploadInvoiceComponent } from './pages/upload-invoice/upload-invoice.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { SortArrPipe } from './sort-arr.pipe';

@NgModule({
  declarations: [AppComponent, InvoiceDetailComponent, UploadInvoiceComponent, SortArrPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
