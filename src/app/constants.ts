import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

export const baseApiUrl = 'http://localhost:8080/jakartaee-hello-world/rest/';
