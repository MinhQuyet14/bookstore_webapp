import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber
} from 'class-validator';

export class LoginDTO {
    @IsPhoneNumber()
    phone_number: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    role_id: number = 1;
    constructor(data: any){
        this.phone_number = data.phone_number;
        this.password = data.password;
    }
}