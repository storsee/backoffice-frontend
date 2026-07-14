import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { PaymentSettingService } from './payment-setting.service';
import { PaymentSettingReqModel } from './payment-setting.model';

@Component({
  selector: 'app-payment-setting',
  templateUrl: './payment-setting.component.html',
  styleUrl: './payment-setting.component.scss'
})
export class PaymentSettingComponent {
  isDataLoaded : boolean = false;
  isSaving = false;
  paymentsetting : PaymentSettingReqModel = new PaymentSettingReqModel();
 
  constructor(public sharedservice : SharedService , private paymentsettingservice : PaymentSettingService){}

  ngOnInit(): void {
    this.getSiteConfig();
  }
  
  getSiteConfig(){
    this.paymentsettingservice.getSiteConfig().subscribe((res : any) => {
      let config = res.data[0];
      this.paymentsetting.rzp_keyId = config.rzp_keyId;
      this.paymentsetting.rzp_keySecret = config.rzp_keySecret;
      this.isDataLoaded = true;
    })
  }
  
  updateSetting(){
    let errTxt = '';

    if (!this.paymentsetting.rzp_keyId) {
      errTxt += 'Enter Razorpay Key ID <br/>';
    }
    if (!this.paymentsetting.rzp_keySecret) {
      errTxt += 'Enter Razorpay Key Secret <br/>';
    }
    
    if (errTxt == '') {
      if (this.isSaving) return;
      this.isSaving = true;
      this.paymentsettingservice.updateSiteConfig(this.paymentsetting).pipe(
        finalize(() => this.isSaving = false)
      ).subscribe((res : any) => {
        if(res){
          this.sharedservice.showAlert(1,'Payment Setting Updated Successfully');
        }else{
          this.sharedservice.showAlert(2,'Something Went Wrong')
        }
      }, err => {
        this.sharedservice.showAlert(2,'Technical Issue Found !')
      })
    } else {
      this.sharedservice.showAlert(2, errTxt);
    }
  }
}
