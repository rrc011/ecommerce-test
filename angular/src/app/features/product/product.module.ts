import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product.component";
import { RouterModule, Routes } from "@angular/router";
import { CreateProductComponent } from "./create-product/create-product.component";
import { SharedModule } from "@shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CurrencyMaskModule } from "ng2-currency-mask";

const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
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
    CurrencyMaskModule,
  ],
  declarations: [ProductComponent, CreateProductComponent],
  entryComponents: [CreateProductComponent],
})
export class ProductModule {}
