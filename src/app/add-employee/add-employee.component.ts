import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  isValid: boolean;
  employee: Employee = new Employee();
  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {}

  addemployee(): void {
    this.employee = new Employee();
  }

  save() {
    this.validateForm();
    if (this.isValid) {
      this.employeeService.addEmployee(this.employee).subscribe(
        (response) => this.showEmployees(),
        (error) => console.log(error)
      );
      this.employee = new Employee();
    }
  }

  onSubmit() {
    this.save();
  }

  validateForm() {
    if (
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.dateOfBirth ||
      !this.employee.dateOfJoin ||
      !this.employee.address ||
      !this.employee.city
    ) {
      this.isValid = false;
      this.alertService.error(
        'Invalid Data , please try again with valid form...'
      );
    } else {
      this.isValid = true;
    }
  }

  showEmployees() {
    this.alertService.success('Employee saved successfully', this.options);
    this.router.navigate(['/employees']);
  }

  calculateAge() {
    const dob = this.employee.dateOfBirth;
    const dobArray = dob.split('-');
    const age = Number(new Date().getFullYear()) - Number(dobArray[0]);
    this.employee.age = age;
  }

  calculateYearOfExp() {
    const doj = this.employee.dateOfJoin;
    const dojArray = doj.split('-');
    const yearOfExp = Number(new Date().getFullYear()) - Number(dojArray[0]);
    this.employee.yearOfExperience = yearOfExp;
  }
}
