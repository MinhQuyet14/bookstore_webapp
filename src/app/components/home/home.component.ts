import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 9;
  pages: number[] =[];
  totalPages: number = 0;
  visiblePage: number[] = [];
  keyword: string = "";

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProducts(this.keyword , this.selectedCategoryId ,this.currentPage, this.itemsPerPage);
    this.getCategories(1, 100);
  }
  getCategories(page: number, limit: number){
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        debugger
        this.categories = categories;
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        console.error("Error fetching  categories: ", error);
      }
    });
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number){
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
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

  searchProducts(){
    this.currentPage = 0;
    this.itemsPerPage = 9;
    debugger
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  onPageChange(page: number){
    debugger;
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
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

}
