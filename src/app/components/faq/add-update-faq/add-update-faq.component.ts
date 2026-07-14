import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../shared/services/shared.service';
import { FaqReqModel } from '../faq.model';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-add-update-faq',
  templateUrl: './add-update-faq.component.html',
  styleUrl: './add-update-faq.component.scss'
})
export class AddUpdateFaqComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: FaqReqModel = new FaqReqModel();
  storePreview : string = '';
  isSaving = false;

  constructor(public sharedservice: SharedService, private faqservice: FaqService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.description = this.data.description;
      this.dataReqModel.title = this.data.title;
    }
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.title) {
      errTxt += 'Enter Title <br/>'
    }
    if (!this.dataReqModel.description) {
      errTxt += 'Enter Description <br/>'
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
    this.faqservice.addFaq(this.dataReqModel).pipe(
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
    this.faqservice.updateFaq(this.data.id, this.dataReqModel).pipe(
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