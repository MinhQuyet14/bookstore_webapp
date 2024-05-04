import { Role } from "src/app/models/role";

export interface UserResponse {
    id: number,
    fullname: string,
    phone_number: string,
    address: string, 
    is_active: string,
    role: Role,
    facebook_account_id: number,
    google_account_id: number
}