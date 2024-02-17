export const DEPARTMENT = {
  FIND_ALL: 'departments/all',
  FIND_WITH_PAGINATION: 'departments',
  FIND_BY_ID: (id: number) => `departments/${id}`,
  ADD: 'departments/add',
  UPDATE: 'departments/update',
  DELETE: 'departments/delete',
};

export const EMPLOYEE = {
  FIND_ALL: 'employees/all',
  FIND_WITH_PAGINATION: 'employees',
  FIND_BY_ID: (id: number) => `employees/${id}`,
  ADD: 'employees/add',
  UPDATE: 'employees/update',
  DELETE: 'employees/delete',
};


export const NUMBER_OF_PAGINATION = [1, 2, 3];

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGE_NUMBER = 1;

export const DEFAULT_DEPARTMENT_FILTER = 0; // not filter by department id will find all

export const EMPLOYEE_MAX_SALARY = 100000;

