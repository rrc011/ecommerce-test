import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  ProductDto,
  ProductDtoPagedResultDto,
  ProductServiceProxy,
  SupplierProductDto,
  SupplierProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { Observable, Observer, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
} from "rxjs/operators";

@Component({
  selector: "app-create-supply-product",
  templateUrl: "./create-supply-product.component.html",
  styleUrls: ["./create-supply-product.component.scss"],
})
export class CreateSupplyProductComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  id: number;
  model = new SupplierProductDto();
  product: ProductDto = new ProductDto();
  search: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _supplyProductService: SupplierProductServiceProxy,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._supplyProductService
        .get(this.id)
        .subscribe((result: SupplierProductDto) => {
          this.model = result;
          this._productService.get(this.model.productId).subscribe((data) => {
            this.product = data;
          });
        });
    }
  }

  submit() {
    if (this.model.id) this.update();
    else this.save();
  }

  save() {
    abp.message.confirm("Are you sure", undefined, (result: boolean) => {
      if (result) {
        this.saving = true;

        const model = new SupplierProductDto();
        model.init(this.model);

        model.productId = this.product.id;

        this._supplyProductService
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

        const model = new SupplierProductDto();
        model.init(this.model);

        this._supplyProductService
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

  suggestions$ = new Observable((observer: Observer<string>) => {
    observer.next(this.search);
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
  }
}
