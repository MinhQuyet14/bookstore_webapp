import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/dtos/product/product.dto';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product.admin.component.html',
  styleUrls: ['./product.admin.component.scss']
})
export class ProductAdminComponent implements OnInit {
  products?: Product[];
  currentPage:number = 0;
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  itemsPerPage: number = 6;
  pages: number[] =[];
  totalPages: number = 0;
  visiblePage: number[] = [];
  keyword: string = "";
  visiblePages: number[] = [];
  categoryId: number= 0;
  constructor(
      private orderService: OrderService,
      private categoryService: CategoryService, 
      private productService: ProductService,
      private router: Router
  ){}
  ngOnInit(): void {
      this.getAllSoldProducts(this.keyword, this.categoryId ,this.currentPage, this.itemsPerPage);
  }
  getAllSoldProducts(keyword: string, category_id:number, page: number, limit: number) {
      debugger
      this.productService.getAllProducts(keyword,this.categoryId, page, limit).subscribe({
          next: (response: any)=> {
              debugger
              this.products = response.products;
              this.totalPages = response.total_pages;
              this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)
          },
          complete: ()=>{
              debugger
              console.log();
          },
          error: (error: any) => {
              debugger
              console.error("Error fetching data: ", error);
          }
      });
  }
  onPageChange(page: number){
      debugger;
      this.currentPage = page;
      this.getAllSoldProducts(this.keyword, this.categoryId, this.currentPage, this.itemsPerPage);
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
      const maxVisiblePages = 5;
      const halfVisiblePages = Math.floor(maxVisiblePages/2);
  
      let startPage = Math.max(currentPage - halfVisiblePages, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
      if(endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
      
      return new Array(endPage-startPage +1).fill(0).map((_, index)=>startPage+index);
  }
  deleteProduct(id:number) {
      const confirmation = window
          .confirm('Bạn có chắc muốn xóa sản phẩm này ?');
      if(confirmation) {
          debugger
          this.productService.deleteProduct(id).subscribe({
              next: (response:any)=> {
                  debugger
                  alert('Xóa thành công')
              },
              complete: ()=> {
                  debugger;
              },
              error: (error:any)=> {
                  debugger;
                  alert('Không thể xóa, đã có lỗi: '+ error);
              }
          });
      }
  }
  viewDetail(product: Product){
      debugger
      this.router.navigate(['admin/products', product.id])
  }   
  addProduct() {
    this.router.navigate(['/admin/add-product']);
  }
  searchProducts(){
    this.currentPage = 0;
    this.itemsPerPage = 9;
    debugger
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number){
    this.productService.getAllSoldProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePage = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: ()=>{
        debugger
      },
      error(err: any) {
        debugger;
        console.error('Error fetching products: ', err);  
      }
    });
}
}
