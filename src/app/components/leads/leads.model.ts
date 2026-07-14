export class LeadsReqModel{
    name: string;
    status: number = 1;
    mobile: number;
    notes: string = '';
    date: string;
    city: string;
    country: string = 'India';
    source: number = 1;
}