import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class RoleService {
    constructor(private http: HttpClient) { }

    getRoleList() {
        return this.http.get<any>(urlConstant.RolesAPI.getRoles);
    }
    addRole(data) {
        return this.http.post<any>(urlConstant.RolesAPI.addRoles, data);
    }
    updateRole(id, data) {
        return this.http.put<any>(urlConstant.RolesAPI.updateRoles+id, data);
    }
    deleteRole(id) {
        return this.http.delete<any>(urlConstant.RolesAPI.deleteRoles+id);
    }

    // -------------- Permissions --------------
    getPermissionByRoleId(id) {
        return this.http.get<any>(urlConstant.PermissionsAPI.getPermissionsByRole+id);
    }
    rolePermissionUpdate(id, data) {
        return this.http.put<any>(urlConstant.PermissionsAPI.rolePermissionUpdate + id, data);
    }
}