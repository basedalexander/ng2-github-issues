import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { ILink } from '../../../common/services/headers-parser.service';
import { PaginationService, FIRST_PAGE } from './pagination.service';

@Component({
    selector: 'pagination',
    template: `
    <ul class="pagination">
        <li>
          <a
            aria-label="First"
            class="pagination-control-btn"
            [class.available]="isPrevAvailable()"
            (click)="onFirstClicked()"
            title="First page">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        
        <li>
          <a
            aria-label="Previous"
            class="pagination-control-btn"
            [class.available]="isPrevAvailable()"
            (click)="onPrevClicked()"
            title="Prev page">
            <span aria-hidden="true">&larr;</span>
          </a>
        </li>
        
        <li
            *ngFor="let page of pager"
            [class.page-current]="isPageCurrent(page)">
            <a
                class='pagination-page'
                (click)="goToPage(page)"
                title="Page">
                {{page}}
            </a>
        </li>
        
        <li>
          <a    
            aria-label="Next"
            class="pagination-control-btn"
            [class.available]="isNextAvailable()"
            (click)="onNextClicked()"
            title="Next page">
            <span aria-hidden="true">&rarr;</span>
          </a>
        </li>
        
        <li>
          <a
            aria-label="Last"
            class="pagination-control-btn"
            [class.available]="isNextAvailable()"
            (click)="onLastClicked()"
            title="Last page">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
    </ul>
    `,
    styleUrls: [`app/github-issues/search-results/pagination/pagination.component.css`],
    providers: [PaginationService]
})
export class PaginationComponent {

    @Input() set link(value: ILink) {

        this.init(value);
    }

    @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(private paginationService: PaginationService) {
    }

    private firstPage: number;
    private lastPage: number;
    private currentPage: number;
    private pager: number[] = [];

    private init(link: ILink): void {
        this.currentPage = this.paginationService.getCurrentPage(link);
        this.pager = this.paginationService.generatePager(link);

        this.firstPage = FIRST_PAGE;
        this.lastPage = this.paginationService.getLastPage(link);
    }

    protected isPageCurrent(pageNum: number): boolean {
        return pageNum === this.currentPage;
    }

    protected isPrevAvailable(): boolean {
        return this.paginationService.isPrevAvailable(this.pager, this.currentPage);
    }

    protected isNextAvailable(): boolean {
        return this.paginationService.isNextAvailable(this.pager, this.currentPage);
    }

    protected onFirstClicked(): void {
        if (this.isPrevAvailable()) {
            this.goFirst();
        }
    }

    protected onLastClicked(): void {
        if (this.isNextAvailable()) {
            this.goLast();
        }
    }

    protected onNextClicked(): void {
        if (this.isNextAvailable()) {
            this.goNext();
        }
    }

    protected onPrevClicked(): void {
        if (this.isPrevAvailable()) {
            this.goPrev();
        }
    }

    private goNext(): void {
        this.goToPage(this.currentPage + 1);
    }

    private goPrev(): void {
        this.goToPage(this.currentPage - 1);
    }

    private goFirst(): void {
        this.goToPage(this.firstPage);
    }

    private goLast(): void {
        this.goToPage(this.lastPage);
    }

    private goToPage(pageNum: number): void {
        this.pageSelected.emit(pageNum);
    }
}