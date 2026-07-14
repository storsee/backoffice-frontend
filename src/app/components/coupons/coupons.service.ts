import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class CouponService {
    constructor(private http: HttpClient) { }

    getCouponList() {
        return this.http.get<any>(urlConstant.CouponsAPI.getCoupons);
    }
    getAllCouponsByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.CouponsAPI.getAllCouponsByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addCoupon(data) {
        return this.http.post<any>(urlConstant.CouponsAPI.addCoupon, data);
    }
    updateCoupon(id, data) {
        return this.http.put<any>(urlConstant.CouponsAPI.updateCoupon+id, data);
    }
    deleteCoupon(id) {
        return this.http.delete<any>(urlConstant.CouponsAPI.deleteCoupon+id);
    }
}