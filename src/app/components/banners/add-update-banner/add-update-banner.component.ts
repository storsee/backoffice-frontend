import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../shared/services/shared.service';
import { BannerReqModel } from '../banners.model';
import { BannerService } from '../banners.service';

@Component({
  selector: 'app-add-update-banner',
  templateUrl: './add-update-banner.component.html',
  styleUrl: './add-update-banner.component.scss'
})
export class AddUpdateBannerComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: BannerReqModel = new BannerReqModel();
  storePreview : string = '';
  isSaving = false;

  constructor(public sharedservice: SharedService, private bannerservice: BannerService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.image = this.data.image;
      this.dataReqModel.url = this.data.url;
    }
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.image) {
      errTxt += 'Upload Image <br/>'
    }
    if (!this.dataReqModel.url) {
      errTxt += 'Enter Store URL <br/>'
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
    this.bannerservice.addBanner(this.dataReqModel).pipe(
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
    this.bannerservice.updateBanner(this.data.id, this.dataReqModel).pipe(
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
  uploadImage(event) {
      const reader = new FileReader();
      let imagePath = event.target.files[0];
      if (imagePath.type == 'image/png' || imagePath.type == 'image/jpeg' || imagePath.type == 'image/jpg' || imagePath.type == 'image/webp') {
          reader.readAsDataURL(imagePath);
          reader.onload = (e) => {
              const Img = new Image();
              Img.src = URL.createObjectURL(event.target.files[0]);
              Img.onload = (e: any) => {
                  const h = e.target.height;          
                  const w = e.target.width;
                  this.dataReqModel.image = String(reader.result);
              };
          };
      } else {
          this.sharedservice.showAlert(2,'Upload PNG/JPG/WEBP Image!');
      }
  }
}