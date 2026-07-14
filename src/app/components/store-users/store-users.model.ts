export class StoreUserReqModel{
    name: string;
    password: number;
    mobile: string;
    email: string;
    storeId : number = null;
    isActive : boolean = true;
    
    ip: string;
}