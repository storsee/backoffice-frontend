import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { RoleService } from '../roles.service';
import { SharedService } from '../../../shared/services/shared.service';
import { RoleReqModel } from '../roles.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-update-role',
  templateUrl: './add-update-role.component.html',
  styleUrl: './add-update-role.component.scss'
})
export class AddUpdateRoleComponent {
  @Input() isEdit;
  @Input() data;
  dataReqModel: RoleReqModel = new RoleReqModel();
  roleList : any[];
  isSaving = false;

  constructor(public sharedservice: SharedService, private rolesservice: RoleService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getRoles();
    if (this.data) {
      this.isEdit = true;
      this.dataReqModel.roleName = this.data.roleName;
    }
  }

  getRoles(){
    // this.roleservice.getRoleList().subscribe((res : any) => {
    //   if(res){
    //     this.roleList = res.data;
    //   }
    // })
  }

  validateData() {
    let errTxt = '';

    if (!this.dataReqModel.roleName) {
      errTxt += 'Enter Role Name <br/>'
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
    this.rolesservice.addRole(this.dataReqModel).pipe(
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
    this.rolesservice.updateRole(this.data.id, this.dataReqModel).pipe(
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