import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UploadInvoiceComponent } from './pages/upload-invoice/upload-invoice.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';

const routes: Routes = [
  // { path: '', component: UploadInvoiceComponent },
  { path: '', component: InvoiceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
