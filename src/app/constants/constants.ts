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
  WITH_LIST_ASSIGNMENT: 'employees/reports/total-hours/department',
  EXPORT_PROFILE_WITH_LIST_ASSIGNMENT: 'employees/reports/total-hours/department/export-profiles'
};

export const PROJECT = {
  FIND_ALL: 'projects/all',
  FIND_WITH_PAGINATION: 'projects',
  FIND_BY_ID: (id: number) => `projects/${id}`,
  ADD: 'projects/add',
  UPDATE: 'projects/update',
  DELETE: 'projects/delete',
  WITH_EMPLOYEE: 'projects/reports/salaries',
  EXPORT_EXCEL_WITH_EMPLOYEE: 'projects/reports/salaries/export-excel',
};

export const ASSIGNMENT = {
  FIND_WITH_PAGINATION: 'assignments',
};

export const RELATIVE = {
  FIND_WITH_PAGINATION: (id: number) => `relatives/employee/${id}`,
};

export const AUTH = {
  LOGIN: 'auth/login',
  SIGNUP: 'auth/signup',
  VERIFY: 'auth/verify',
  RENEW: 'auth/renew-token',
};

export const USER = {
  FIND_WITH_PAGINATION: 'users',
};

export const NUMBER_OF_PAGINATION = [1, 2, 3];

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGE_NUMBER = 1;

export const DEFAULT_DEPARTMENT_FILTER = 0; // not filter by department id will find all

export const DEFAULT_PROJECT_FILTER = 0;

export const DEFAULT_EMPLOYEE_FILTER = 0;

export const EMPLOYEE_MAX_SALARY = 100000;

export const DEFAULT_SEARCH = '';
