import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber
} from 'class-validator';
import { Product } from 'src/app/models/product';

export interface CartItem {
    product_id: number;
    quantity: number;
   
}