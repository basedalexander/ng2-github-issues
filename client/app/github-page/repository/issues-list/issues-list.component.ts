import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { PaginationComponent } from './pagination/pagination.component';
import { IIssuesResponse } from 'common/services';
import { SpinnerComponent } from 'common/components';
import { IssuesListService } from './issues-list.service';

@Component({
    selector: 'search-results',
    moduleId: module.id,
    template: `
    <div>
        <div class="issues-header" id="issues-header">
            <i class="fa fa-exclamation-circle"></i> {{results.data.length}} Open
        </div>
         
        <div class="issue-list-container">
            <ul class="issue-list">
                <li *ngFor="let issue of results.data" class="issue-list_item">
                
                    <div class="issue-status">
                        <i class="fa fa-exclamation-circle"></i>
                    </div>
                    
                    <div class="issue-preview">
                        <h4 class="issue-preview_header">{{issue.title}}</h4>    
                        <span class="issue-perview_info">
                            #{{issue.number}} opened {{issue.created_at}} by {{issue.user.login}}
                        </span>
                    </div>
                </li>
            </ul>
            
            <div class="loading-screen" *ngIf="loading">
                <spinner></spinner>
            </div>
        </div>
        
        <pagination
            *ngIf="_results.link"
            [link]="_results.link"
            (pageSelected)="onPageSelected($event)">
        </pagination>
    </div> 
    `,
    directives: [PaginationComponent, SpinnerComponent],
    providers: [IssuesListService],
    styleUrls: [`./issues-list.component.css`]
})
export class IssuesListComponent {
    @Input() set results(value: IIssuesResponse) {
        this.loading = false;
        this._results = value;
    }

    @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(private searchResultsService: IssuesListService) {
    }

    get results(): IIssuesResponse {
        return this._results;
    }

    protected onPageSelected(pageNum: number): void {
        this.loading = true;
        this.searchResultsService.scrollToTop();
        this.pageSelected.emit(pageNum);
    }

    private loading: boolean = false;

    private _results: IIssuesResponse;
}