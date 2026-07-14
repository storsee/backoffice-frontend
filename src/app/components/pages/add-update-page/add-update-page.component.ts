import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../../shared/services/shared.service';
import { PageService } from '../pages.service';
import { PageReqModel } from '../pages.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageCategoryService } from '../../page-categories/page-categories.service';

@Component({
  selector: 'app-add-update-page',
  templateUrl: './add-update-page.component.html',
  styleUrl: './add-update-page.component.scss'
})
export class AddUpdatePageComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: PageReqModel = new PageReqModel();
  pageCategories : any[] = [];
  isSaving = false;

  constructor(public sharedservice: SharedService, private pageservice: PageService, private pagecategoryservice: PageCategoryService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getPageCategories();
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.displayorder = this.data.displayorder;
      this.dataReqModel.icon = this.data.icon;
      this.dataReqModel.pagename = this.data.pagename;
      this.dataReqModel.url = this.data.url;
      this.dataReqModel.categoryId = this.data.categoryId;
    }
  }
  getPageCategories(){
    this.pagecategoryservice.getPageCategoryList().subscribe((res: any) => {
      if(res){
        this.pageCategories = res.data;
      }
    })
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.pagename) {
      errTxt += 'Enter Page Name <br/>';
    }
    if (!this.dataReqModel.url) {
      errTxt += 'Enter Redirection URL <br/>';
    }else{
      if(this.dataReqModel.url[0] != '/'){
        errTxt += "Redirection URL Must Starts With '/' <br/>";
      }
    }
    if (!this.dataReqModel.displayorder) {
      errTxt += 'Enter Display Order <br/>';
    }
    if (!this.dataReqModel.icon) {
      errTxt += 'Enter Icon <br/>';
    }
    if (!this.dataReqModel.categoryId) {
      errTxt += 'Select Page Category <br/>';
    }

    if (errTxt == '') {
      this.dataReqModel.categoryId = +this.dataReqModel.categoryId;
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
    this.pageservice.addPage(this.dataReqModel).pipe(
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
    this.pageservice.updatePage(this.data.pageId, this.dataReqModel).pipe(
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