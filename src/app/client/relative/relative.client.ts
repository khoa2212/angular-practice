import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelativeList} from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { RELATIVE } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class RelativeClient {
  constructor(private httpClient: HttpClient) {}

  findRelatives$(
    pageNumber: number,
    pageSize: number,
    employeeId: number
  ): Observable<RelativeList> {
    const relatives = this.httpClient.get<RelativeList>(
      `${ENVIRONMENT.BASE_URL}/${RELATIVE.FIND_WITH_PAGINATION(employeeId)}`,
      { params: { pageNumber, pageSize } }
    );

    return relatives;
  }
}
