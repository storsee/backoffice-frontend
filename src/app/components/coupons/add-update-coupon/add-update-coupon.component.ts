import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../../shared/services/shared.service';
import { CouponService } from '../coupons.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponReqModel } from '../coupons.model';

@Component({
  selector: 'app-add-update-coupon',
  templateUrl: './add-update-coupon.component.html',
  styleUrl: './add-update-coupon.component.scss'
})
export class AddUpdateCouponComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: CouponReqModel = new CouponReqModel();
  storePreview : string = '';
  isSaving = false;

  constructor(public sharedservice: SharedService, private couponservice: CouponService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.code = this.data.code;
      this.dataReqModel.discount = this.data.discount;
      this.dataReqModel.name = this.data.name;
      this.dataReqModel.min_limit = this.data.min_limit;
    }
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.name) {
      errTxt += 'Enter Name <br/>'
    }
    if (!this.dataReqModel.discount) {
      errTxt += 'Enter Discount <br/>'
    }else{
      if (this.dataReqModel.discount>100 && this.dataReqModel.discount<0) {
        errTxt += 'Enter Valid Discount Between (0-100) <br/>'
      } 
    }
    if (!this.dataReqModel.code) {
      errTxt += 'Enter Code <br/>'
    }
    if (!this.dataReqModel.min_limit) {
      errTxt += 'Enter Limit <br/>'
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
    this.couponservice.addCoupon(this.dataReqModel).pipe(
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
    this.couponservice.updateCoupon(this.data.id, this.dataReqModel).pipe(
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