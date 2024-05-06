export class UpdateUserDTO {
    fullname: string
    address: string
    password: string
    retype_password: string
    //email: string

    constructor(data: any) {
        this.fullname = data.fullname;
        this.address = data.address;
        this.password = data.password;
        this.retype_password = data.retype_password;
        //this.email = data.email;
    }
}