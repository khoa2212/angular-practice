import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from 'app/model';
import { UserClient } from 'app/client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userClient: UserClient) {}

  findUsers$(
    pageNumber: number,
    pageSize: number,
  ): Observable<UserList> {
    const relatives = this.userClient.findUsers$(
      pageNumber,
      pageSize,
    );

    return relatives;
  }
}
