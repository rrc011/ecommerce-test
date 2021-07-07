import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  SupplierProductDto,
  SupplierProductDtoPagedResultDto,
  SupplierProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { AppSessionService } from "@shared/session/app-session.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateSupplyProductComponent } from "./create-supply-product/create-supply-product.component";

class PagedSupplierProductRequestDto extends PagedRequestDto {
  keywords: string;
  CategoryId: number;
}

@Component({
  selector: "app-Products-to-supply",
  templateUrl: "./Products-to-supply.component.html",
  styleUrls: ["./Products-to-supply.component.scss"],
})
export class ProductsToSupplyComponent extends PagedListingComponentBase<SupplierProductDto> {
  supplierProducts: SupplierProductDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _supplierProductService: SupplierProductServiceProxy,
    private _sessionService: AppSessionService
  ) {
    super(injector);
  }

  protected list(
    request: PagedSupplierProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keywords = this.keyword;

    console.log(this._sessionService.user);

    this._supplierProductService
      .getAll(
        request.keywords,
        undefined,
        undefined,
        this._sessionService.userId,
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
        this.supplierProducts = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: SupplierProductDto): void {
    abp.message.confirm(
      "Are you sure to delete this item",
      undefined,
      (result: boolean) => {
        if (result) {
          this._supplierProductService
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

  create(): void {
    this.showCreateOrEditDialog();
  }

  edit(role: SupplierProductDto): void {
    this.showCreateOrEditDialog(role.id);
  }

  showCreateOrEditDialog(id?: number): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this._modalService.show(
        CreateSupplyProductComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        CreateSupplyProductComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
