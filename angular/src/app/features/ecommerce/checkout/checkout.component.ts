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
  ProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  model = new ProductDto();
  total: number = 0;
  quantity: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._productService.get(this.id).subscribe((result: ProductDto) => {
        this.model = result;
      });
    }
  }

  submit() {
    abp.message.confirm("Are you sure", undefined, (result: boolean) => {
      if (result) {
        this.saving = true;

        const model = new ProductDto();
        model.init(this.model);

        this._productService
          .checkout(model.id, this.quantity)
          .pipe(
            finalize(() => {
              this.saving = false;
            })
          )
          .subscribe(() => {
            abp.message.success("Your orden has been received");
            this.bsModalRef.hide();
            this.onSave.emit();
          });
      }
    });
  }

  summary() {
    this.total = this.model.price * this.quantity;
  }
}
