import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CategoryDto,
  CategoryServiceProxy,
  ProductDto,
  ProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  model = new ProductDto();
  categories: CategoryDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _categoryService: CategoryServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._productService.get(this.id).subscribe((result: ProductDto) => {
        this.model = result;
      });
    }

    this.loadCategories();
  }

  submit() {
    if (this.model.id) this.update();
    else this.save();
  }

  save() {
    abp.message.confirm("Are you sure", undefined, (result: boolean) => {
      if (result) {
        this.saving = true;

        const model = new ProductDto();
        model.init(this.model);

        this._productService
          .create(model)
          .pipe(
            finalize(() => {
              this.saving = false;
            })
          )
          .subscribe(() => {
            this.notify.info(this.l("SavedSuccessfully"));
            this.bsModalRef.hide();
            this.onSave.emit();
          });
      }
    });
  }

  update(): void {
    abp.message.confirm("Are you sure", undefined, (result: boolean) => {
      if (result) {
        this.saving = true;

        const model = new ProductDto();
        model.init(this.model);

        this._productService
          .update(model)
          .pipe(
            finalize(() => {
              this.saving = false;
            })
          )
          .subscribe(() => {
            this.notify.info(this.l("SavedSuccessfully"));
            this.bsModalRef.hide();
            this.onSave.emit();
          });
      }
    });
  }

  loadCategories() {
    this._categoryService.getAllWithoutPagination().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }

  generateCode() {
    this._productService
      .generateProductCode()
      .subscribe((data) => (this.model.code = data));
  }
}
