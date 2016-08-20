import { Component } from '@angular/core';

import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ResultsPerPageControl } from './page-limit-control/page-limit-control.component';

import {
    GithubIssuesModel,
    IIssuesResponse,
    LoggerService,
    ISearchData
} from 'common/services';

import {
    NotificationComponent,
    INotification,
    Notification,
    SpinnerComponent
} from 'common/components';

@Component({
    selector: 'github-issues',
    template: `
    <div class="app-container">
    
        <button (click)="onPrint()">Print searchdata</button>
        
        <search-box
            (searchDataChanged)="onSearchDataChanged($event)"
            (searchSubmitted)="searchForData()">
        </search-box>
        
        <results-per-page-control
           [(value)]="resultsPerPage">
        </results-per-page-control>
        
        <notification [notification]="error"></notification>
        
        <spinner *ngIf="loading && !results"></spinner>
        
        <search-results
            *ngIf="results"
            [results]="results"
            (pageSelected)="onPageSelected($event)">
        </search-results>
    </div>
    `,
    directives: [
        SearchBoxComponent,
        SearchResultsComponent,
        ResultsPerPageControl,
        SpinnerComponent,
        NotificationComponent
    ],
    styles: [
        `
    .app-container {
        padding: 0 10px;
    }
    
    search-box,
    page-limit-controll,
    spinner {
        border: 1px solid transparent;
        margin-bottom: 20px;
    }
    
    `
    ]
})
export class GithubIssuesComponent {

    onPrint(): void {
        console.log(this.searchData, typeof this.searchData);
    }

    constructor(private issuesService: GithubIssuesModel,
                private logger: LoggerService) {
        this.loading = false;
    }

    protected onSearchDataChanged(value: ISearchData): void {
        this.searchData = value;
    }

    protected onResultsPerPageChanged(value: number): void {
        this.resultsPerPage = value;
    }

    protected searchForData(pageNumber?: number): void {
        this.issuesService.fetch(this.searchData, pageNumber)
            .subscribe(
                data => {
                    this.results = data;
                    this.logger.log(this.results);
                },
                error => {
                    this.results = undefined;
                    this.showError(`Can't load issues for specified fields`, error.stack);
                },
                () => {
                    this.loading = false;
                }
            );
    }

    protected onPageSelected(pageNum: number): void {
        this.loading = true;
        this.searchForData(pageNum);
    }

    protected showError(message: string, stack: any): void {
        this.error = new Notification('error', message + `\n\n ${stack}`);
        this.logger.error(message, stack);
    }

    private error: INotification;
    private searchData: ISearchData;
    private resultsPerPage: number = 12;
    private results: IIssuesResponse;
    private loading: boolean;
}