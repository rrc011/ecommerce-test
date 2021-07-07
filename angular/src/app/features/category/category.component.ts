import { Component, Injector, OnInit } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoryDto,
  CategoryDtoPagedResultDto,
  CategoryServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateCategoryComponent } from "./create-category/create-category.component";

class PagedCategoryRequestDto extends PagedRequestDto {
  keywords: string;
}

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent extends PagedListingComponentBase<CategoryDto> {
  categories: CategoryDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _categoryService: CategoryServiceProxy
  ) {
    super(injector);
  }

  protected list(
    request: PagedCategoryRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keywords = this.keyword;

    this._categoryService
      .getAll(
        request.keywords,
        undefined,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CategoryDtoPagedResultDto) => {
        this.categories = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(entity: CategoryDto): void {
    abp.message.confirm(
      "Are you sure to delete this item",
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryService
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

  edit(role: CategoryDto): void {
    this.showCreateOrEditDialog(role.id);
  }

  showCreateOrEditDialog(id?: number): void {
    let createOrEditRoleDialog: BsModalRef;
    if (!id) {
      createOrEditRoleDialog = this._modalService.show(
        CreateCategoryComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditRoleDialog = this._modalService.show(
        CreateCategoryComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditRoleDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
