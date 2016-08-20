import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { PaginationComponent } from './pagination/pagination.component';
import { IIssuesResponse } from '../../common/services/github-issues.model';
import { SpinnerComponent } from '../../common/components/spinner/spinner.component';
import { SearchResultsService } from './search.results.service';

@Component({
    selector: 'search-results',
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
    providers: [SearchResultsService],
    styles: [
        `
    .issues-header,
    .issue-list_item {
        padding: 8px 15px;
    }

    .issues-header {
        background-color: #f8f8f8;
        border: 1px solid #ccc;
    }
    
    .issue-list{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    
    .issue-list_item {
        border: 1px solid #ccc;
    }

    .issue-status,
    .issue-preview {
        display: inline-block;
    }
    
    .issue-status {
        vertical-align: top;
        margin-right: 10px;
        color: #4cae4c;
    }
    
    .issue-preview_header {
        margin-top: 0;
        margin-bottom: 5px;
    }
    .issue-perview_info {
        color: #767676;
        font-size: .9em;
    }
    
    .page-selected {
        font-weight: bold;
    }
    
    .issue-list-container {
        position: relative;
    }
    
    .loading-screen {
        position: absolute;
        z-index: 1100;
        background-color: #fff;
        opacity: .9;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
         
    `
    ]
})
export class SearchResultsComponent {
    @Input() set results(value: IIssuesResponse) {
        this.loading = false;
        this._results = value;
    }

    @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(private searchResultsService: SearchResultsService) {
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