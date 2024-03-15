import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { USER } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class UserClient {
  constructor(private httpClient: HttpClient) {}

  findUsers$(pageNumber: number, pageSize: number): Observable<UserList> {
    const users = this.httpClient.get<UserList>(
      `${ENVIRONMENT.BASE_URL}/${USER.FIND_WITH_PAGINATION}`,
      { params: { pageNumber, pageSize } }
    );

    return users;
  }
}
