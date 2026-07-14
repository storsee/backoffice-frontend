import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ThemeCategoriesReqModel } from '../theme-category.model';
import { ThemeCategoryService } from '../theme-category.service';
import { SharedService } from '../../../shared/services/shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-update-theme-category',
  templateUrl: './add-update-theme-category.component.html',
  styleUrl: './add-update-theme-category.component.scss'
})
export class AddUpdateThemeCategoryComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: ThemeCategoriesReqModel = new ThemeCategoriesReqModel();
  isSaving = false;

  constructor(public sharedservice: SharedService, private themecategoryservice: ThemeCategoryService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.name = this.data.name;
      this.dataReqModel.icon = this.data.icon;
    }
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.name) {
      errTxt += 'Enter Name <br/>'
    }
    if (!this.dataReqModel.icon) {
      errTxt += 'Enter Icon <br/>'
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
    this.themecategoryservice.addThemeCategory(this.dataReqModel).pipe(
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
    this.themecategoryservice.updateThemeCategory(this.data.id, this.dataReqModel).pipe(
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