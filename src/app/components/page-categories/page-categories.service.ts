import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class PageCategoryService {
    constructor(private http: HttpClient) { }

    getPageCategoryList() {
        return this.http.get<any>(urlConstant.PageCategorysAPI.getPageCategorysAPIs);
    }
    getAllPageCategorysByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.PageCategorysAPI.getAllPageCategorysByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addPageCategory(data) {
        return this.http.post<any>(urlConstant.PageCategorysAPI.addPageCategorysAPIs, data);
    }
    updatePageCategory(id, data) {
        return this.http.put<any>(urlConstant.PageCategorysAPI.updatePageCategorysAPIs+id, data);
    }
    deletePageCategory(id) {
        return this.http.delete<any>(urlConstant.PageCategorysAPI.deletePageCategorysAPIs+id);
    }
}