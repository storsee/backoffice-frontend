import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { StoreService } from '../stores.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../templates/templates.service';

@Component({
  selector: 'app-view-store-detail',
  templateUrl: './view-store-detail.component.html',
  styleUrl: './view-store-detail.component.scss'
})
export class ViewStoreDetailComponent implements OnInit{
  singleData : any;
  templateList : any[] = [];
  @Input() id;

  constructor(public sharedservice : SharedService, public activeModal : NgbActiveModal, private templateservice: TemplateService, private storeservice : StoreService){}

  ngOnInit(): void {
    this.getTemplateList();
    this.getSingleData();
  }
  getTemplateList(){
    this.templateservice.getTemplateList().subscribe((res : any) => {
      if(res){
        this.templateList = res.data;
      }
    })
  }

  getSingleData(){
    this.storeservice.getStoreById(this.id).subscribe((res : any) => {
      if(res){
        this.singleData = res.data;
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
