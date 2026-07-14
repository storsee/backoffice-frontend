import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class BannerService {
    constructor(private http: HttpClient) { }

    getBannerList() {
        return this.http.get<any>(urlConstant.BannersAPI.getBanners);
    }
    getAllBannersByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.BannersAPI.getAllBannersByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addBanner(data) {
        return this.http.post<any>(urlConstant.BannersAPI.addBanner, data);
    }
    updateBanner(id, data) {
        return this.http.put<any>(urlConstant.BannersAPI.updateBanner+id, data);
    }
    deleteBanner(id) {
        return this.http.delete<any>(urlConstant.BannersAPI.deleteBanner+id);
    }
}