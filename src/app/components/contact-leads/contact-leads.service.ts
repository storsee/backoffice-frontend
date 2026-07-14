import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class ContactLeadService {
    constructor(private http: HttpClient) { }

    getContactleadList() {
        return this.http.get<any>(urlConstant.ContactleadsAPI.getContactleads);
    }
    getAllContactleadsByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.ContactleadsAPI.getAllContactleadsByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addContactlead(data) {
        return this.http.post<any>(urlConstant.ContactleadsAPI.addContactlead, data);
    }
    updateContactlead(id, data) {
        return this.http.put<any>(urlConstant.ContactleadsAPI.updateContactlead+id, data);
    }
    deleteContactlead(id) {
        return this.http.delete<any>(urlConstant.ContactleadsAPI.deleteContactlead+id);
    }
}