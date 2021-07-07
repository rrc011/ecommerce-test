import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoryDto,
  CategoryServiceProxy,
  ProductDto,
  ProductDtoPagedResultDto,
  ProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateProductComponent } from "./create-product/create-product.component";

class PagedProductRequestDto extends PagedRequestDto {
  keywords: string;
  CategoryId: number;
}

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent extends PagedListingComponentBase<ProductDto> {
  products: ProductDto[] = [];
  keyword = "";
  categoryId: number;
  advancedFiltersVisible = false;
  categories: CategoryDto[] = [];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _productService: ProductServiceProxy,
    private _categoryService: CategoryServiceProxy
  ) {
    super(injector);
    this.loadCategories();
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

  create(): void {
    this.showCreateOrEditDialog();
  }

  edit(role: ProductDto): void {
    this.showCreateOrEditDialog(role.id);
  }

  showCreateOrEditDialog(id?: number): void {
    let createOrEditRoleDialog: BsModalRef;
    if (!id) {
      createOrEditRoleDialog = this._modalService.show(CreateProductComponent, {
        class: "modal-lg",
      });
    } else {
      createOrEditRoleDialog = this._modalService.show(CreateProductComponent, {
        class: "modal-lg",
        initialState: {
          id: id,
        },
      });
    }

    createOrEditRoleDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  clearFilters(): void {
    this.keyword = "";
    this.categoryId = undefined;
    this.getDataPage(1);
  }

  loadCategories() {
    this._categoryService.getAllWithoutPagination().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
}
