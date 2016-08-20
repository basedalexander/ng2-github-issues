import { Component } from '@angular/core';

import { IRepositoryData, SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { IssuesService, IIssuesResponse } from '../shared/services/github-issues.service';
import { LoggerService } from '../shared/services/logger.service';
import { PageLimitControl } from './page-limit-control/page-limit-control.component';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import {
    NotificationComponent,
    INotification,
    Notification,
} from '../shared/components/notification/notification.component';

@Component({
    selector: 'github-issues',
    template: `
    <div class="app-container">
        <search-box [(searchData)]="searchData" (searchSubmitted)="searchForData()"></search-box>
        
        <page-limit-controll></page-limit-controll>
        
        <notification [notification]="error"></notification>
        
        <spinner *ngIf="loading && !results"></spinner>
        
        <div *ngIf="results">
            <search-results [results]="results" (pageChoosen)="searchForData($event)"></search-results>
        </div>
    </div>
    `,
    directives: [
        SearchBoxComponent,
        SearchResultsComponent,
        PageLimitControl,
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

    constructor(private issuesService: IssuesService,
                private logger: LoggerService) {

        this.searchData = {
            user: 'angular',
            repo: 'angular'
        };

        this.loading = false;
    }

    protected searchForData(pageNumber?: number): void {
        this.loading = true;

        this.issuesService.fetch(this.searchData, pageNumber)
            .subscribe(
                data => {
                    this.loading = false;
                    this.results = data;
                    this.logger.log(this.results);
                },
                error => {
                    this.loading = false;
                    this.results = undefined;
                    this.showError();
                });
    }

    protected showError(): void {
        const message: string = `Can't load issues for specified fields`;
        this.error = new Notification('error', message);
        this.logger.error(message);
    }

    private error: INotification;

    private searchData: IRepositoryData;
    private results: IIssuesResponse;
    private loading: boolean;
}