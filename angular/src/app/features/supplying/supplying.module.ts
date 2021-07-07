import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SupplyingComponent } from "./supplying.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SupplyComponent } from "./supply/supply.component";

const routes: Routes = [
  {
    path: "",
    component: SupplyingComponent,
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
    BsDatepickerModule,
  ],
  declarations: [SupplyingComponent, SupplyComponent],
  entryComponents: [SupplyComponent],
})
export class SupplyingModule {}
