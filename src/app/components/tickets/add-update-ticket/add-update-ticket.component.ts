import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../shared/services/shared.service';
import { TicketReqModel } from '../tickets.model';
import { TicketService } from '../tickets.service';

@Component({
  selector: 'app-add-update-ticket',
  templateUrl: './add-update-ticket.component.html',
  styleUrl: './add-update-ticket.component.scss'
})
export class AddUpdateTicketComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: TicketReqModel = new TicketReqModel();
  storeList : any[] = [];
  isSaving = false;

  constructor(public sharedservice: SharedService, private ticketservice: TicketService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getStoresList();

    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.content = this.data.content;
      this.dataReqModel.storeId = this.data.storeId;
      this.dataReqModel.status = this.data.status;
      this.dataReqModel.subject = this.data.subject;
    }
  }

  getStoresList(){
    // this.storeservice.getStoresList().subscribe((res : any) => {
    //   if(res){
    //     this.storeList = res.data;
    //   }
    // })
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.subject) {
      errTxt += 'Enter Subject <br/>'
    }
    if (!this.dataReqModel.content) {
      errTxt += 'Enter Content <br/>'
    }
    if (!this.dataReqModel.storeId) {
      errTxt += 'Select Store <br/>'
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
    this.ticketservice.addTicket(this.dataReqModel).pipe(
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
    this.ticketservice.updateTicket(this.data.id, this.dataReqModel).pipe(
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