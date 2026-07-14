import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserReqModel } from '../users.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../roles/roles.service';

@Component({
  selector: 'app-add-update-users',
  templateUrl: './add-update-users.component.html',
  styleUrl: './add-update-users.component.scss'
})
export class AddUpdateUsersComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: UserReqModel = new UserReqModel();
  roleList : any[];
  isSaving = false;

  constructor(public sharedservice: SharedService, private userservice: UserService, private roleservice: RoleService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getRoles();
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.email = this.data.email;
      this.dataReqModel.isActive = this.data.isActive;
      this.dataReqModel.mobile = this.data.mobile;
      this.dataReqModel.name = this.data.name;
      this.dataReqModel.password = this.data.password;
      this.dataReqModel.roleId = this.data.roleId;
      this.dataReqModel.ip = this.data.ip;
    }else{
      this.dataReqModel.ip = this.sharedservice.ip;
    }
  }

  getRoles(){
    this.roleservice.getRoleList().subscribe((res : any) => {
      if(res){
        this.roleList = res.data;
      }
    })
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.name) {
      errTxt += 'Enter Name <br/>'
    }
    if (!this.dataReqModel.password) {
      errTxt += 'Enter Password <br/>'
    }
    if (!this.dataReqModel.email) {
      errTxt += 'Enter Email <br/>'
    }else{
      if (String(this.dataReqModel.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) { } else {
        errTxt += 'Enter Valid Email<br/>'
      }
    }
    if (!this.dataReqModel.mobile) {
      errTxt += 'Enter Mobile <br/>'
    }else{
      if(String(this.dataReqModel.mobile).length != 10){
        errTxt += 'Enter Valid Mobile <br/>'
      }
    }
     
    if (errTxt == '') {
      this.dataReqModel.roleId = Number(this.dataReqModel.roleId);
      this.dataReqModel.mobile = String(this.dataReqModel.mobile);
      this.dataReqModel.isActive = true;
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
    this.userservice.addUser(this.dataReqModel).pipe(
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
    this.userservice.updateUser(this.data.id, this.dataReqModel).pipe(
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