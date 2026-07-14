import { Component, Input } from '@angular/core';
import { TemplateService } from '../templates.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-view-template-detail',
  templateUrl: './view-template-detail.component.html',
  styleUrl: './view-template-detail.component.scss'
})
export class ViewTemplateDetailComponent {
  singleData : any;
  @Input() id;

  constructor(public sharedservice : SharedService, public activeModal : NgbActiveModal, private templateservice : TemplateService){}

  ngOnInit(): void {
    this.getSingleData();
  }

  getSingleData(){
    this.templateservice.getTemplateById(this.id).subscribe((res : any) => {
      if(res){
        this.singleData = res.data;
      }
    },err => {
      if(err.status == 401){
        this.activeModal.close();
      }else{
        this.sharedservice.showAlert(2, 'Something Went Wrong');
      }
    })
  }
}
