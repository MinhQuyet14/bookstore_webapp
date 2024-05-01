import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { OrderDTO } from "../dtos/order/order.dto";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiOrder = "http://localhost:8080/api/v1/orders";

    constructor(private http: HttpClient) {}
    placeOrder(orderData: OrderDTO): Observable<any> {
        return this.http.post(this.apiOrder, orderData);
    }
    
}