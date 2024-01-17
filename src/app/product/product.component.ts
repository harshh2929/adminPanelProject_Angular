import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  showAddProductForm = false;
  newProduct: any = {
    name: '',   
    price: null,
    quantity: null,
    manufacturerName: '',
    manufacturerLocation: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('https://localhost:7207/api/Product')
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  addProduct() {
    this.toggleAddProductForm();
  }

  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }

  submitAddProductForm() {
    if (
      this.newProduct.name &&
      this.newProduct.price !== null &&
      this.newProduct.quantity !== null &&
      this.newProduct.manufacturerName &&
      this.newProduct.manufacturerLocation
    ) {
      this.http.post('https://localhost:7207/api/Product', this.newProduct)
        .subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.fetchProducts();
            this.resetAddProductForm();
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }

  cancelAddProductForm() {
    this.resetAddProductForm();
  }

  resetAddProductForm() {
    this.showAddProductForm = false;
    this.newProduct = {
      name: '',
      price: null,
      quantity: null,
      manufacturerName: '',
      manufacturerLocation: ''
    };
  }
}
