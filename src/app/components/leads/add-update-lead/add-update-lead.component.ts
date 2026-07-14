import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LeadsReqModel } from '../leads.model';
import { SharedService } from '../../../shared/services/shared.service';
import { LeadService } from '../leads.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-update-lead',
  templateUrl: './add-update-lead.component.html',
  styleUrl: './add-update-lead.component.scss'
})
export class AddUpdateLeadComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: LeadsReqModel = new LeadsReqModel();
  storePreview : string = '';
  isSaving = false;

  constructor(public sharedservice: SharedService, private leadservice: LeadService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.name = this.data.name;
      this.dataReqModel.date = this.data.date;
      this.dataReqModel.mobile = this.data.mobile;
      this.dataReqModel.notes = this.data.notes;
      this.dataReqModel.status = this.data.status;
      this.dataReqModel.city = this.data.city;
      this.dataReqModel.country = this.data.country;
      this.dataReqModel.source = this.data.source;
    }
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.name) {
      errTxt += 'Enter Name <br/>'
    }
    if (!this.dataReqModel.status) {
      errTxt += 'Select Status <br/>'
    }
    if (!this.dataReqModel.source) {
      errTxt += 'Select Source <br/>'
    }
    if (!this.dataReqModel.date) {
      errTxt += 'Select Date <br/>'
    }
    if (!this.dataReqModel.city) {
      errTxt += 'Enter City <br/>'
    }
    if (!this.dataReqModel.country) {
      errTxt += 'Enter Country <br/>'
    }
    if (!this.dataReqModel.mobile) {
      errTxt += 'Enter Mobile <br/>'
    }else{
      if (String(this.dataReqModel.mobile).length != 10) {
        errTxt += 'Enter Valid Mobile <br/>'
      }
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
    this.leadservice.addLead(this.dataReqModel).pipe(
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
    this.leadservice.updateLead(this.data.id, this.dataReqModel).pipe(
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