import { Component, Injector, OnInit } from "@angular/core";
import { AppAuthService } from "@shared/auth/app-auth.service";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  ProductDto,
  ProductDtoPagedResultDto,
  ProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CheckoutComponent } from "./checkout/checkout.component";

class PagedProductRequestDto extends PagedRequestDto {
  keywords: string;
  CategoryId: number;
}

@Component({
  selector: "app-ecommerce",
  templateUrl: "./ecommerce.component.html",
  styleUrls: ["./ecommerce.component.scss"],
})
export class EcommerceComponent extends PagedListingComponentBase<ProductDto> {
  products: ProductDto[] = [];
  keyword = "";
  categoryId: number;

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _productService: ProductServiceProxy,
    private _authService: AppAuthService
  ) {
    super(injector);
  }

  protected list(
    request: PagedProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keywords = this.keyword;
    request.CategoryId = this.categoryId;

    this._productService
      .getAll(
        request.keywords,
        request.CategoryId,
        undefined,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ProductDtoPagedResultDto) => {
        this.products = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: ProductDto): void {
    abp.message.confirm(
      "Are you sure to delete this item",
      undefined,
      (result: boolean) => {
        if (result) {
          this._productService
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

  openCheckoutModal(item: ProductDto) {
    let dialog: BsModalRef;

    dialog = this._modalService.show(CheckoutComponent, {
      class: "modal-lg",
      initialState: {
        id: item.id,
      },
    });

    dialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  logout(): void {
    this._authService.logout();
  }
}
