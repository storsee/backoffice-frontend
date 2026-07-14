import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';

@Injectable({
    providedIn: 'root'
})


export class SiteConfigService {
    constructor(private http: HttpClient) { }

    getIpAddress() {
        return this.http.get('http://ip-api.com/json');
    }
    getSiteConfig() {
        return this.http.get(urlConstant.SiteConfigAPI.getSiteConfig);
    }
    updateSiteConfig(data) {
        return this.http.put(urlConstant.SiteConfigAPI.updateSiteConfig, data);
    }
}