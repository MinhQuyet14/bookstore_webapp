import { Role } from "./role";

export interface User {
    id: number;
    fullname: string;
    phone_number: string;
    address: string;
    password: string;
    is_active: boolean;
    facebook_account_id: number;
    google_account_id: number;
    role: Role;
    created_at:Date;
    updated_at:Date;
}