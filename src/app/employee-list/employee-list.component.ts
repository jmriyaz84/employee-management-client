import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  searchByName: string;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => console.log(error)
    );
  }
  onSubmit() {
    this.employeeService.getEmployeesByName(this.searchByName).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => console.log(error)
    );
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      (data) => {
        this.alertService.success(
          'Employee got deleted successfully',
          this.options
        );
        this.loadEmployees();
      },
      (error) => console.log(error)
    );
  }
  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
}
