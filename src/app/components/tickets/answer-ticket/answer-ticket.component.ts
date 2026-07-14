import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorConfig, ST_BUTTONS } from 'ngx-simple-text-editor';
import { SharedService } from '../../../shared/services/shared.service';
import { TicketService } from '../tickets.service';

@Component({
  selector: 'app-answer-ticket',
  templateUrl: './answer-ticket.component.html',
  styleUrl: './answer-ticket.component.scss'
})
export class AnswerTicketComponent {
  editorConfig: EditorConfig = {
    buttons: ST_BUTTONS,
  };
  
  constructor(public sharedservice : SharedService, private ticketservice : TicketService, public activeModal : NgbActiveModal){}

  @Input() data;
  @Input() nextStatus;
  isSaving = false;

  updateStatus(){
    if (this.isSaving) return;
    let newData = {
      subject: this.data.subject,
      content: this.data.content,
      answer: this.data.answer,
      status: this.nextStatus,
      storeId: this.data.storeId,
      serviceId: this.data.serviceId,
    }
    this.isSaving = true;
    this.ticketservice.updateTicket(this.data.id,newData).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res : any) => {
      if(res){
        this.sharedservice.showAlert(1,'Status Updated Successfully');
        this.activeModal.close(true);
      }else{
        this.sharedservice.showAlert(2,'Something Went Wrong');
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