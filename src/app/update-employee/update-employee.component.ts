import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  employee: Employee;
  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      (response) => {
        console.log(response);
        this.employee = response;
      },
      (error) => console.log(error)
    );
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (response) => this.showEmployees(response),
      (error) => console.log(error)
    );
    this.employee = new Employee();
  }

  onSubmit() {
    this.updateEmployee();
  }

  showEmployees(response) {
    this.alertService.success(`Employee updated successfully`, this.options);
    this.router.navigate(['/employees']);
  }
}
