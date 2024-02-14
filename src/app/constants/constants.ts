export const DEPARTMENT = {
  FIND_ALL: '/departments/all',
  FIND_WITH_PAGINATION: '/departments',
  FIND_BY_ID: (id: number) => `/departments/${id}`,
  ADD: '/departments/add',
  UPDATE: 'departments/update',
  DELETE: 'departments/delete',
};
