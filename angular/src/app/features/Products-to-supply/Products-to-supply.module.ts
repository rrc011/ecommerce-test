import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsToSupplyComponent } from "./Products-to-supply.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateSupplyProductComponent } from "./create-supply-product/create-supply-product.component";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { CurrencyMaskModule } from "ng2-currency-mask";

const routes: Routes = [
  {
    path: "",
    component: ProductsToSupplyComponent,
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
    TypeaheadModule,
    CurrencyMaskModule,
  ],
  declarations: [ProductsToSupplyComponent, CreateSupplyProductComponent],
})
export class ProductsToSupplyModule {}
