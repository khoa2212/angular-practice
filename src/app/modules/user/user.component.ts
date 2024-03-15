import { Component, OnInit } from '@angular/core';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_PAGINATION,
} from 'app/constants';
import { UserList } from 'app/model';
import { AuthService, UserService, LoaderService } from 'app/service';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  readonly #userRefetch$ = new Subject<void>();

  currentPage: number = DEFAULT_PAGE_NUMBER;
  pageSize: number = DEFAULT_PAGE_SIZE;

  numberOfPagination: number[] = NUMBER_OF_PAGINATION;

  userList$ = this.#userRefetch$.pipe(
    startWith(true),
    switchMap(() =>
      this.UserService.findUsers$(this.currentPage, this.pageSize)
    )
  );

  constructor(
    private UserService: UserService,
    private toastrService: ToastrService,
    private loadingService: LoaderService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chooseNumberOfPagination();
  }

  chooseNumberOfPagination(): void {
    this.userList$.subscribe((value) => {
      if (NUMBER_OF_PAGINATION.length >= value.lastPage) {
        const page =
          value.totalCount % this.pageSize === 0
            ? value.lastPage - 1
            : value.lastPage;
        this.numberOfPagination = Array.from({ length: page }, (_, i) => i + 1);
      } else {
        this.numberOfPagination = NUMBER_OF_PAGINATION;
      }
    });
  }

  onSelectPage(page: number): void {
    this.userList$ = this.#userRefetch$.pipe(
      startWith(true),
      switchMap(() => this.UserService.findUsers$(page, this.pageSize))
    );

    this.currentPage = page;
  }

  onNext(userList: UserList): void {
    if (this.disableNext(userList)) {
      return;
    }

    const page = this.currentPage + 1;
    this.userList$ = this.#userRefetch$.pipe(
      startWith(true),
      switchMap(() => this.UserService.findUsers$(page, this.pageSize))
    );

    this.currentPage = page;
  }

  onPrev(): void {
    if (this.disablePrev()) {
      return;
    }

    const page = this.currentPage - 1;
    this.userList$ = this.#userRefetch$.pipe(
      startWith(true),
      switchMap(() => this.UserService.findUsers$(page, this.pageSize))
    );

    this.currentPage = page;
  }

  disablePrev(): boolean {
    if (this.currentPage === 1) {
      return true;
    }

    return false;
  }

  disableNext(userList: UserList): boolean {
    const compareValue =
    userList.totalCount % this.pageSize === 0
        ? userList.lastPage - 1
        : userList.lastPage;

    if (this.currentPage === compareValue || userList.lastPage === 1) {
      return true;
    }

    return false;
  }

  showInfo(userList: UserList) {
    let from = this.pageSize * (this.currentPage - 1) + 1;

    if (userList.totalCount === 0) {
      from = 0;
    }

    let to =
      userList.totalCount < this.pageSize
        ? userList.totalCount
        : this.pageSize * this.currentPage;

    if (to > userList.totalCount) {
      to = userList.totalCount;
    }

    return { from, to };
  }

  isLoading(): boolean {
    return this.loadingService.getLoading();
  }
}
