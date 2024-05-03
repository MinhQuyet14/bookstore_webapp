import { Product } from "src/app/models/product";
import { OrderDetail } from "./order.detail";
import { User } from "./user";

export interface Order {
    id: number;
    user: User;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    orderDate: Date
    status: string;
    total_money: string;
    shipping_method: string;
    shipping_address: string;
    shipping_date: Date;
    tracking_number: string;
    payment_method: string;
    active: boolean;
    orderDetails: OrderDetail[];
}