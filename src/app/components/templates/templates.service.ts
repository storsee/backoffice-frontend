import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class TemplateService {
    constructor(private http: HttpClient) { }

    getTemplateList() {
        return this.http.get<any>(urlConstant.TemplatesAPI.getTemplates);
    }
    getAllTemplatesByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.TemplatesAPI.getAllTemplatesByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    getTemplateById(id) {
        return this.http.post<any>(urlConstant.TemplatesAPI.getTemplateById,{id});
    }
    addTemplate(data) {
        return this.http.post<any>(urlConstant.TemplatesAPI.addTemplate, data);
    }
    updateTemplate(id, data) {
        return this.http.put<any>(urlConstant.TemplatesAPI.updateTemplate+id, data);
    }
    deleteTemplate(id) {
        return this.http.delete<any>(urlConstant.TemplatesAPI.deleteTemplate+id);
    }
}