import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelativeList } from 'app/model';
import { RelativeClient } from 'app/client';


@Injectable({
  providedIn: 'root',
})
export class RelativeService {
  constructor(private relativeClient: RelativeClient) {}

  findRelatives$(
    pageNumber: number,
    pageSize: number,
    employeeId: number,
  ): Observable<RelativeList> {
    const relatives = this.relativeClient.findRelatives$(
      pageNumber,
      pageSize,
      employeeId
    );

    return relatives;
  }
}
