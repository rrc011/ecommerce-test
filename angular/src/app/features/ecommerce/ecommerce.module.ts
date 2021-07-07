import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EcommerceComponent } from "./ecommerce.component";
import { CheckoutComponent } from "./checkout/checkout.component";

const routes: Routes = [
  {
    path: "",
    component: EcommerceComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EcommerceComponent, CheckoutComponent],
  entryComponents: [CheckoutComponent],
})
export class EcommerceModule {}
