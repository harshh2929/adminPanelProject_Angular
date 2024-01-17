import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {
  username: string = '';
  password: string = '';

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  submitForm() {
    if (this.isValidLogin()) {
      const loginData = {
        username: this.username,
        password: this.password
      };

      this.httpClient.post('https://localhost:7207/api/Login', loginData)
        .subscribe(
          (response: any) => {
            console.log('Login response:', response);

            if (response) {
              console.log('Login successful:', response);
              this.showAlert('Login successful!');
              this.clearForm();
              //redirect to another page
            } else {
              console.error('User not registered or invalid login details:', response);
              this.showAlert('User not registered or invalid login details');
            }
          },
          (error) => {
            console.error('Login error:', error);

            if (error.status === 401) {
              this.showAlert('Invalid username or password');
            } else {
              this.showAlert('An error occurred during login');
            }
          }
        );
    } else {
      this.showAlert('Invalid login data');
    }
  }

  isValidLogin(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }

  showAlert(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
    });
  }

  clearForm() {
    this.username = '';
    this.password = '';
  }
}
