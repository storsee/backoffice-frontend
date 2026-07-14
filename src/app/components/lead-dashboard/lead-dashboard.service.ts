import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';

@Injectable({
    providedIn: 'root'
})


export class LeadDashboardService {
    constructor(private http: HttpClient) { }

    superAdminDashboard() {
        return this.http.get(urlConstant.DashboardAPI.leadsDashboard);
    }
}