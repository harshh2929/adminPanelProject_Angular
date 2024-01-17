import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.css']
})
export class SignUpScreenComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  submitForm() {
    if (this.isValidLogin()) {
      const postData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      const apiUrl = 'https://localhost:7207/api/Signup';

      this.httpClient.post(apiUrl, postData)
        .subscribe(
          (response) => {
            console.log('API response:', response);
            this.clearForm();
            alert('Registration successful!');
          },
          (error) => {
            console.error('API error:', error);
            alert('Registration failed. Please try again.');
          }
        );
    }
  }

  clearForm() {
    this.username = '';
    this.email = '';
    this.password = '';
  }

  isValidLogin(): boolean {
    return true;
  }
}
