import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { RoleService } from '../roles.service';
import { SharedService } from '../../../shared/services/shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageService } from '../../pages/pages.service';
export enum RoleFlag { None = 15, View = 1, Insert = 2, Update = 4, Delete = 8 }

@Component({
  selector: 'app-update-role-permission',
  templateUrl: './update-role-permission.component.html',
  styleUrl: './update-role-permission.component.scss'
})
export class UpdateRolePermissionComponent {
  @Input() data;
  permissionMenus = [];
  pageArr = [];
  roleFlag = RoleFlag;
  categoriesList : any;
  isSaving = false;

  constructor(private roleservice: RoleService, public pageservice: PageService, public sharedservice: SharedService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.pageservice.getPageList().subscribe((res: any) => {
      if (res) {
        this.pageArr = res.data;
        this.categoriesList = [...new Set(this.pageArr.map(item => item.categoryName))];

        console.log('this.categoriesList --->',this.categoriesList);
        this.getPermissionByRoleId();
      }
    })
  }

  getPermissionByRoleId() {
    this.roleservice.getPermissionByRoleId(this.data.id).subscribe((res) => {
      if (res) {
        this.pageArr.forEach(f => {
          let findPermission = res.data.find(fi => fi.pageid == f.pageId);
          if (findPermission) {
            f.permissionAction = findPermission.action;
          } else {
            f.permissionAction = 0;
          }
        })
      }
    })
  }

  submitRolePermissionForm() {
    if (this.isSaving) return;
    let req = [];
    this.pageArr.forEach((x) => {
      req.push({
        action: x.permissionAction,
        pageid: x.pageId,
      })
    });
    this.isSaving = true;
    this.roleservice.rolePermissionUpdate(this.data.id, req).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      if (res) {
        this.sharedservice.showAlert(1, 'Role Updated Successfully');
        this.activeModal.close(true);
      }
    }, err => {
      if(err.status == 401){
        this.activeModal.close();
      }else{
        this.sharedservice.showAlert(2, 'Something Went Wrong');
      }
    });
  }

  checkboxShow(pageAction: number, actionValue: 1 | 2 | 4 | 8) {
    return pageAction & actionValue;
  }

  changePermission(page, actionValue: 1 | 2 | 4 | 8, isView: boolean) {
    page.permissionAction = (page.permissionAction & actionValue) ? page.permissionAction - actionValue + ((page.permissionAction == 0 && !isView) ? 1 : 0) : page.permissionAction + actionValue + (page.permissionAction == 0 && !isView ? 1 : 0);
    page.permissionAction = (page.permissionAction & 1) ? page.permissionAction : 0;
  }

  allChecked(page, pageRole: number) {
    page.permissionAction = page.permissionAction == pageRole ? 0 : pageRole;
  }
}