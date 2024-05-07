import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { OrderDTO } from "../dtos/order/order.dto";
import { OrderResponse } from "../responses/order/order.response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiOrder = "http://localhost:8080/api/v1/orders";
    private apiGetAllOrders = "http://localhost:8080/api/v1/orders/get-orders-by-keyword";
    constructor(private http: HttpClient) {}
    placeOrder(orderData: OrderDTO): Observable<any> {
        return this.http.post(this.apiOrder, orderData);
    }
    getOrderById(orderId: number) :Observable<any> {
        return this.http.get(`${this.apiOrder}/${orderId}`);
    }
    getAllOrders(keyword: string, page: number, limit: number): Observable<OrderResponse[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<any>(this.apiGetAllOrders, {params});
    }
}