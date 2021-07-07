import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { AppComponentBase } from "@shared/app-component-base";
import {
  SupplierProductDto,
  SupplierProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-supply",
  templateUrl: "./supply.component.html",
  styleUrls: ["./supply.component.scss"],
})
export class SupplyComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  model = new SupplierProductDto();
  quantity: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _supplierProductService: SupplierProductServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._supplierProductService
        .get(this.id)
        .subscribe((result: SupplierProductDto) => {
          this.model = result;
        });
    }
  }

  submit(form: NgForm) {
    if (!form.value.quantity) {
      abp.notify.error("Input Quantity");
      return;
    }

    abp.message.confirm("Are you sure", undefined, (result: boolean) => {
      if (result) {
        this.saving = true;

        const model = new SupplierProductDto();
        model.init(this.model);

        this._supplierProductService
          .supply(model.id, this.quantity)
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

  save() {
    abp.message.confirm("Are you sure", undefined, (result: boolean) => {
      if (result) {
        this.saving = true;

        const model = new SupplierProductDto();
        model.init(this.model);

        this._supplierProductService
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

        this._supplierProductService
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
}
