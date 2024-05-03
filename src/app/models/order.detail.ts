import { Product } from "src/app/models/product";
import { Order } from "./order";

export interface OrderDetail {
    id: number;
    product: Product;
    order: Order;
    price: number;
    number_of_products: number;
    total_money: number;
}