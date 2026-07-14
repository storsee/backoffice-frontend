export class UserReqModel{
    name: string;
    password: number;
    mobile: string;
    email: string;
    roleId : number = null;
    isActive : boolean = true;
    
    ip: string;
}