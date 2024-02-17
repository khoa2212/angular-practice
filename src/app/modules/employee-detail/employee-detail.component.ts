import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from 'app/model';
import { DepartmentService, EmployeeService, LoaderService } from 'app/service';
import { Observable, Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent implements OnInit {
  readonly #departmentRefetch$ = new Subject<void>();
  readonly #employeeRefetch$ = new Subject<void>();

  departmentList$ = this.#departmentRefetch$.pipe(
    startWith(true),
    switchMap(() => this.departmentService.findAll$())
  );

  employeeId: number = 1;

  employee$: Observable<Employee> = this.#employeeRefetch$.pipe(
    startWith(true),
    switchMap(() => this.employeeService.findById$(this.employeeId))
  )

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.employeeId = +(params.get('id') ?? "1");
    });
  }
}
