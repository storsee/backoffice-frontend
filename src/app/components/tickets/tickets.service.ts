import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../shared/constant/urlConst';
@Injectable({
    providedIn: 'root'
})

export class TicketService {
    constructor(private http: HttpClient) { }

    getTicketList() {
        return this.http.get<any>(urlConstant.TicketsAPI.getTickets);
    }
    getAllTicketsByPage(page, limit, searchTxt) {
        return this.http.get<any>(urlConstant.TicketsAPI.getAllTicketsByPage+`?limit=${limit}&page=${page}&searchtxt=${searchTxt}`);
    }
    addTicket(data) {
        return this.http.post<any>(urlConstant.TicketsAPI.addTicket, data);
    }
    updateTicket(id, data) {
        return this.http.put<any>(urlConstant.TicketsAPI.updateTicket+id, data);
    }
    deleteTicket(id) {
        return this.http.delete<any>(urlConstant.TicketsAPI.deleteTicket+id);
    }
}