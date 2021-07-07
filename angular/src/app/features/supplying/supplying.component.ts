import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  Product,
  ProductDto,
  ProductServiceProxy,
  SupplierProductDto,
  SupplierProductDtoPagedResultDto,
  SupplierProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize, map, switchMap } from "rxjs/operators";
import * as moment from "moment";
import { Moment } from "moment";
import { Observable, Observer, of } from "rxjs";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SupplyComponent } from "./supply/supply.component";

class PagedSupplierProductRequestDto extends PagedRequestDto {
  keywords: string;
  Quantity: number;
  EstimatedDelivery: Moment;
}

@Component({
  selector: "app-supplying",
  templateUrl: "./supplying.component.html",
  styleUrls: ["./supplying.component.scss"],
})
export class SupplyingComponent extends PagedListingComponentBase<SupplierProductDto> {
  supplyingList: SupplierProductDto[] = [];
  keyword = "";
  Quantity;
  estimatedDelivery: Date;
  minDate = new Date();
  datepickerModel: Date;
  product: ProductDto = new ProductDto();
  search: string;

  form: FormGroup;

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _productService: ProductServiceProxy,
    private _supplierProdructService: SupplierProductServiceProxy,
    private fb: FormBuilder
  ) {
    super(injector);

    this.form = fb.group({
      keywords: new FormControl("", Validators.required),
      Quantity: new FormControl(""),
      estimatedDelivery: new FormControl(""),
    });
  }

  protected list(
    request: PagedSupplierProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keywords = this.controls.keywords.value;
    request.Quantity = this.controls.Quantity.value;

    if (this.controls.estimatedDelivery.value)
      request.EstimatedDelivery = moment(this.controls.estimatedDelivery.value);

    this._supplierProdructService
      .getAll(
        request.keywords,
        request.Quantity,
        request.EstimatedDelivery,
        undefined,
        undefined,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: SupplierProductDtoPagedResultDto) => {
        this.supplyingList = result.items;

        this.supplyingList.forEach((item) => {
          var date = new Date();
          date.setDate(date.getDate() + item.estimatedDelivery);
          item["date"] = date.toLocaleDateString("en-US");
        });

        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: SupplierProductDto): void {
    abp.message.confirm(
      "Are you sure to delete this item",
      undefined,
      (result: boolean) => {
        if (result) {
          this._supplierProdructService
            .delete(entity.id)
            .pipe(
              finalize(() => {
                abp.notify.success("Successfully Deleted");
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  suggestions$ = new Observable((observer: Observer<string>) => {
    observer.next(this.controls.keywords.value);
  }).pipe(
    switchMap((query: string) => {
      if (query) {
        return this._productService
          .getAll(query, undefined, undefined, 0, 10)
          .pipe(map((item) => item.items));
      }

      return of([]);
    })
  );

  onSelect(event: TypeaheadMatch): void {
    this.product.init(event.item);
    this.keyword = this.product.code;
  }

  get controls() {
    return this.form.controls;
  }

  clear() {
    this.product = new ProductDto();
    this.form.patchValue({
      keywords: "",
      Quantity: "",
      estimatedDelivery: "",
    });
  }

  openSupplyDialog(id) {
    let dialog: BsModalRef;
    dialog = this._modalService.show(SupplyComponent, {
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });

    dialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
