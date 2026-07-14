export class TicketReqModel{
    subject: string;
    content: string;
    answer: string = '';
    status: number = 1;
    storeId: number = null;
}