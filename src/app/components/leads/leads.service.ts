import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class LeadService {
    constructor(private http: HttpClient) { }

    getLeadList() {
        return this.http.get<any>(urlConstant.LeadsAPI.getLeads);
    }
    getAllLeadsByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.LeadsAPI.getAllLeadsByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    getLeadsByStatusByPage(page, limit, searchTxt, status) {
        return this.http.post<any>(urlConstant.LeadsAPI.getLeadsByStatusByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`, {status});
    }
    addLead(data) {
        return this.http.post<any>(urlConstant.LeadsAPI.addLead, data);
    }
    updateLead(id, data) {
        return this.http.put<any>(urlConstant.LeadsAPI.updateLead+id, data);
    }
    deleteLead(id) {
        return this.http.delete<any>(urlConstant.LeadsAPI.deleteLead+id);
    }
}