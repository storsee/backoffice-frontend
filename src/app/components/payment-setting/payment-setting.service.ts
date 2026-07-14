import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';

@Injectable({
    providedIn: 'root'
})


export class PaymentSettingService {
    constructor(private http: HttpClient) { }

    getSiteConfig() {
        return this.http.get(urlConstant.PaymentSettingAPI.getPaymentSetting);
    }
    updateSiteConfig(data) {
        return this.http.put(urlConstant.PaymentSettingAPI.updatePaymentSetting, data);
    }
}