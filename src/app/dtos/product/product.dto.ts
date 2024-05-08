export class ProductDTO {
    name: string;
    price: number;
    url:string;
    description: string;
    //category_id: number;
    author: string;
    constructor(data: any){
        this.name=data.name;
        this.price=data.price;
        this.url=data.url;
        this.description=data.description;
        //this.category_id=data.category_id;
        this.author=data.author
    }
}