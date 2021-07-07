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
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  id: number;
  model = new CategoryDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.id) {
      this._categoryService.get(this.id).subscribe((result: CategoryDto) => {
        this.model = result;
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

        const model = new CategoryDto();
        model.init(this.model);

        this._categoryService
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

        const model = new CategoryDto();
        model.init(this.model);

        this._categoryService
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
