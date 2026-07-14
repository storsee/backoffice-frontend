import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class PageService {
    constructor(private http: HttpClient) { }

    getPageList() {
        return this.http.get<any>(urlConstant.PagesAPI.getPages);
    }
    getAllPagesByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.PagesAPI.getAllPagesByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addPage(data) {
        return this.http.post<any>(urlConstant.PagesAPI.addPages, data);
    }
    updatePage(id, data) {
        return this.http.put<any>(urlConstant.PagesAPI.updatePages+id, data);
    }
    deletePage(id) {
        return this.http.delete<any>(urlConstant.PagesAPI.deletePages+id);
    }
}