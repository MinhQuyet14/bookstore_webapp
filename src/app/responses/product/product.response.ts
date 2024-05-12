import { Product } from "src/app/models/product";

export interface ProductResponse {
    id:number;
    name: string;
    price: number;
    url:string;
    description: string;
    category_id: number;
    author: string;
    sold: number;
    units_in_stock:number;
}