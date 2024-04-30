import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = "http://localhost:8080/api/v1/categories";

    constructor(private http: HttpClient) {}
    getCategories(page: number, limit: number) : Observable<Product[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
        return this.http.get<Product[]>(this.apiGetCategories, { params });
    }
}
