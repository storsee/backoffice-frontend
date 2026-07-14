import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../shared/services/shared.service';
import { PageCategoriesReqModel } from '../page-categories.model';
import { PageCategoryService } from '../page-categories.service';

@Component({
  selector: 'app-add-update-page-category',
  templateUrl: './add-update-page-category.component.html',
  styleUrl: './add-update-page-category.component.scss'
})
export class AddUpdatePageCategoryComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: PageCategoriesReqModel = new PageCategoriesReqModel();
  isSaving = false;

  constructor(public sharedservice: SharedService, private pagecategoryservice: PageCategoryService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.name = this.data.name;
      this.dataReqModel.displayOrder = this.data.displayOrder;
    }
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.name) {
      errTxt += 'Enter Category Name <br/>'
    }
    if (!this.dataReqModel.displayOrder) {
      errTxt += 'Enter Display Order <br/>'
    }

    if (errTxt == '') {
      if (this.isEdit) {
        this.updateData();
      } else {
        this.addData();
      }
    } else {
      this.sharedservice.showAlert(2, errTxt);
    }
  }

  addData() {
    if (this.isSaving) return;
    this.isSaving = true;
    this.pagecategoryservice.addPageCategory(this.dataReqModel).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res: any) => {
      if (res) {
        this.sharedservice.showAlert(1, 'Data Added Successfully');
        this.activeModal.close(true);
      } else {
        this.sharedservice.showAlert(2, 'Something Went Wrong');
      }
    }, err => {
      if(err.status == 401){
        this.activeModal.close();
      }else{
        this.sharedservice.showAlert(2, 'Something Went Wrong');
      }
    })
  }
  updateData() {
    if (this.isSaving) return;
    this.isSaving = true;
    this.pagecategoryservice.updatePageCategory(this.data.id, this.dataReqModel).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res: any) => {
      if (res) {
        this.sharedservice.showAlert(1, 'Data Updated Successfully');
        this.activeModal.close(true);
      } else {
        this.sharedservice.showAlert(2, 'Something Went Wrong');
      }
    }, err => {
      if(err.status == 401){
        this.activeModal.close();
      }else{
        this.sharedservice.showAlert(2, 'Something Went Wrong');
      }
    })
  }
}