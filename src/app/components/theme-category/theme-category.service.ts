import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class ThemeCategoryService {
    constructor(private http: HttpClient) { }

    getThemeCategoryList() {
        return this.http.get<any>(urlConstant.ThemeCategorysAPI.getThemeCategorys);
    }
    getAllThemecategorysByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.ThemeCategorysAPI.getAllThemecategorysByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addThemeCategory(data) {
        return this.http.post<any>(urlConstant.ThemeCategorysAPI.addThemeCategory, data);
    }
    updateThemeCategory(id, data) {
        return this.http.put<any>(urlConstant.ThemeCategorysAPI.updateThemeCategory+id, data);
    }
    deleteThemeCategory(id) {
        return this.http.delete<any>(urlConstant.ThemeCategorysAPI.deleteThemeCategory+id);
    }
}