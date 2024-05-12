import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { ProductDTO } from "../dtos/product/product.dto";
import { ProductResponse } from "../responses/product/product.response";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = "http://localhost:8080/api/v1/products";

    constructor(private http: HttpClient) {}
    getAllProducts(keyword: string, categoryId: number,page: number, limit: number) : Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId)
            .set('page', page.toString())
            .set('limit', limit.toString())
        return this.http.get<Product[]>(this.apiGetProducts, { params });
    }
    getDetailProduct(productId: number) : Observable<any> {
        return this.http.get(`${this.apiGetProducts}/${productId}`);
    }
    getProductsByIds(productIds: number[]):Observable<Product[]> {
        debugger;
        const params = new HttpParams().set('ids', productIds.join(','));
        return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, {params});
    }
    deleteProduct(productId: number):Observable<any> {
        return this.http.delete(`${this.apiGetProducts}/${productId}`);
    }
    updateProduct(productId: number, productDTO: ProductDTO){
        return this.http.put(`${this.apiGetProducts}/${productId}`, productDTO);
    }
    getHotProducts() : Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiGetProducts}/top-sold-products`);
    }
    getAllSoldProducts(keyword: string, categoryId: number,page: number, limit: number) : Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId)
            .set('page', page.toString())
            .set('limit', limit.toString())
        return this.http.get<Product[]>(`${this.apiGetProducts}/sold-products`, { params });
    } 
    //createProduct(productDTO: ProductDTO, )
}

// them slogan, liet ra cac mat hang hot, quan ly nguon nhap sach