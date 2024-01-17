import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; 


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  sellers: any[] = [];
  showAddSellerForm = false;
  newSeller: any = {
    name: '',
    salary: null,
    mobile: '',
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchSellers();
  }

  fetchSellers() {
    this.http.get<any[]>('https://localhost:7207/api/Seller')
      .subscribe(
        (data) => {
          this.sellers = data;
        },
        (error) => {
          console.error('Error fetching sellers:', error);
        }
      );
  }

  addSeller() {
    this.toggleAddSellerForm();
  }

  toggleAddSellerForm() {
    this.showAddSellerForm = !this.showAddSellerForm;
  }

  submitAddSellerForm() {
    this.http.post('https://localhost:7207/api/Seller', this.newSeller)
      .subscribe(
        (response) => {
          console.log('Seller added successfully:', response);
          this.fetchSellers();
          this.resetAddSellerForm();
        },
        (error) => {
          console.error('Error adding seller:', error);
        }
      );
  }

  cancelAddSellerForm() {
    this.resetAddSellerForm();
  }

  resetAddSellerForm() {
    this.showAddSellerForm = false;
    this.newSeller = {
      name: '',
      salary: null,
      mobile: '',
    };
  }
}
