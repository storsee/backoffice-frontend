import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { EditorConfig, ST_BUTTONS } from 'ngx-simple-text-editor';
import { PoliciesReqModel } from './policies.model';
import { PoliciesService } from './policies.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent {
  isDataLoaded : boolean = false;
  isSaving = false;
  policiesModel : PoliciesReqModel = new PoliciesReqModel();


  editorConfig: EditorConfig = {
      buttons: ST_BUTTONS,
    };
 
  constructor(public sharedservice : SharedService , private policiesservice : PoliciesService){}

  ngOnInit(): void {
    this.getSiteConfig();
  }
  
  getSiteConfig(){
    this.policiesservice.getPolicies().subscribe((res : any) => {
      let data = res.data[0];
      this.policiesModel.cancellationPolicy = data.cancellationPolicy;
      this.policiesModel.paymentPolicy = data.paymentPolicy;
      this.policiesModel.privacyPolicy = data.privacyPolicy;
      this.policiesModel.termscondition = data.termscondition;
      this.isDataLoaded = true;
    })
  }
  
  updatePolicies(){
    let errTxt = '';

    if (!this.policiesModel.privacyPolicy) {
      errTxt += 'Enter Privacy Policy <br/>';
    }
    if (!this.policiesModel.termscondition) {
      errTxt += 'Enter Terms Condition <br/>';
    }
    if (!this.policiesModel.paymentPolicy) {
      errTxt += 'Enter Payment Policy <br/>';
    }
    if (!this.policiesModel.cancellationPolicy) {
      errTxt += 'Enter Cancellation Policy <br/>';
    }
    
    if (errTxt == '') {
      if (this.isSaving) return;
      this.isSaving = true;
      this.policiesservice.updatePolicies(this.policiesModel).pipe(
        finalize(() => this.isSaving = false)
      ).subscribe((res : any) => {
        if(res){
          this.sharedservice.showAlert(1,'Policies Updated Successfully');
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
