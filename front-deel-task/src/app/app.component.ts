import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MainService } from "./services/main.service";
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
// @ts-ignore
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup} from "@angular/forms";

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  ClientId: string;
  number: string;
  state: string;
  title: string;
}

export interface GithubIssue2 {
  ClientId: number;
  ContractorId: number;
  createdAt: any;
  id: number
  status: string;
  terms: string;
  updatedAt: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  displayedColumns: string[] = ['ClientId', 'ContractorId', 'createdAt', 'id', 'status', 'terms', 'updatedAt'];
  exampleDatabase: ExampleHttpDatabase | null | undefined;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  title = 'front-end-deel-task';

  constructor(private mainService: MainService, private _httpClient: HttpClient) {

    this.mainService.getContractById().subscribe((data:any): any => {
      console.log('getContractById: ', data);
    });

    this.mainService.getAllProfileRelatedContracts().subscribe((data:any): any => {
      console.log('getAllProfileRelatedContracts: ', data);
    });

    this.mainService.getProfileRelatedUnpaidJobs().subscribe((data:any): any => {
      console.log('getProfileRelatedUnpaidJobs: ', data);
    });

    /*

    this.mainService.payJobToContractor().subscribe((data:any): any => {
      console.log('payJobToContractor: ', data);
    });

    this.mainService.depositMoneyToClientAccount().subscribe((data:any): any => {
      console.log('depositMoneyToClientAccount: ', data);
    });


    */

    this.mainService.getBestProfession().subscribe((data:any): any => {
      console.log('getBestProfession: ', data);
    });

    this.mainService.getBestClients().subscribe((data:any): any => {
      console.log('getBestClients: ', data);
    });



  }

  startChange(event:any){
    console.log('event', event);
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.

    // @ts-ignore
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // @ts-ignore

    return this.mainService.getAllProfileRelatedContracts().subscribe((data: GithubIssue[]) => {
      console.log('data www', data);
      this.data = data;
      this.isLoadingResults = false;
    });
  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {
  }

  getRepoIssues(page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=created&order=desc&page=${
      page + 1
    }`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
