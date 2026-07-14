import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class FaqService {
    constructor(private http: HttpClient) { }

    getFaqList() {
        return this.http.get<any>(urlConstant.FaqsAPI.getFaqs);
    }
    getAllFaqByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.FaqsAPI.getAllFaqByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addFaq(data) {
        return this.http.post<any>(urlConstant.FaqsAPI.addFaq, data);
    }
    updateFaq(id, data) {
        return this.http.put<any>(urlConstant.FaqsAPI.updateFaq+id, data);
    }
    deleteFaq(id) {
        return this.http.delete<any>(urlConstant.FaqsAPI.deleteFaq+id);
    }
}