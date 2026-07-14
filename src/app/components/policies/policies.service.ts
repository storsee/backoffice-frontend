import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';

@Injectable({
    providedIn: 'root'
})


export class PoliciesService {
    constructor(private http: HttpClient) { }

    getPolicies() {
        return this.http.get(urlConstant.PoliciesAPI.getPolicies);
    }
    updatePolicies(data) {
        return this.http.put(urlConstant.PoliciesAPI.updatePolicies, data);
    }
}