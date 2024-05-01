import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber
} from 'class-validator';
import { CartItem } from './cart.item';


export class OrderDTO {
    user_id: number
    fullname: string
    email: string
    phone_number: string
    address: string
    note: string
    total_money: number
    payment_method: string
    shipping_method: string
    cart_items: CartItem[]

    constructor(data: any){
        this.user_id = data.user_id;
        this.fullname = data.fullname;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.note = data.note;
        this.total_money = data.total_money;
        this.payment_method = data.payment_method;
        this.shipping_method = data.shipping_method;
        this.cart_items = data.cart_items;
    }
}