import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class PackageService {
    constructor(private http: HttpClient) { }

    getPackageList() {
        return this.http.get<any>(urlConstant.PackagesAPI.getPackages);
    }
    getAllPackagesByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.PackagesAPI.getAllPackagesByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addPackage(data) {
        return this.http.post<any>(urlConstant.PackagesAPI.addPackage, data);
    }
    updatePackage(id, data) {
        return this.http.put<any>(urlConstant.PackagesAPI.updatePackage+id, data);
    }
    deletePackage(id) {
        return this.http.delete<any>(urlConstant.PackagesAPI.deletePackage+id);
    }
}