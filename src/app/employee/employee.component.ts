import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  showAddEmployeeForm = false;
  newEmployee: any = {
    name: '',
    salary: null,
    performance: '',
    address: '',
    mobile: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get<any[]>('https://localhost:7207/api/Employee')
      .subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
  }


  addEmployee() {
    this.toggleAddEmployeeForm();
  }

  toggleAddEmployeeForm() {
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }

  submitAddEmployeeForm() {
    const newEmployeeData = {
      name: this.newEmployee.name,
      salary: this.newEmployee.salary,
      performance: this.newEmployee.performance,
      address: this.newEmployee.address,
      mobile: this.newEmployee.mobile
    };

    this.http.post('https://localhost:7207/api/Employee', newEmployeeData)
      .subscribe(
        (response) => {
          console.log('Employee added successfully:', response);
          this.fetchEmployees();
          this.resetAddEmployeeForm();
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
  }

  cancelAddEmployeeForm() {
    this.resetAddEmployeeForm();
  }

  resetAddEmployeeForm() {
    this.showAddEmployeeForm = false;
    this.newEmployee = {
      name: '',
      salary: null,
      performance: '',
      address: '',
      mobile: ''
    };
  }
}
