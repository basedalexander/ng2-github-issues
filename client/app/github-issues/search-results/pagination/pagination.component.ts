import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { ILink } from '../../../common/services/headers-parser.service';
import { PaginationService } from './pagination.service';

@Component({
    selector: 'pagination',
    template: `
    <ul class="pagination">
        <li>
          <a
            aria-label="First"
            class="pagination-control-btn"
            [class.available]="isPrevAvailable()"
            (click)="isPrevAvailable() && goFirst()"
            title="First page">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        
        <li>
          <a
            aria-label="Previous"
            class="pagination-control-btn"
            [class.available]="isPrevAvailable()"
            (click)="isPrevAvailable() && goPrev()"
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
            (click)="isNextAvailable() && goNext()"
            title="Next page">
            <span aria-hidden="true">&rarr;</span>
          </a>
        </li>
        
        <li>
          <a
            aria-label="Last"
            class="pagination-control-btn"
            [class.available]="isNextAvailable()"
            (click)="isNextAvailable() && goLast()"
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

    private currentPage: number;
    private pager: number[] = [];

    private init(link: ILink): void {
        this.currentPage = this.paginationService.getCurrentPage(link);
        this.pager = this.paginationService.generatePager(link);
    }

    protected goNext(): void {
        this.goToPage(this.currentPage + 1);
    }

    protected goPrev(): void {
        this.goToPage(this.currentPage - 1);
    }

    protected goFirst(): void {
        this.goToPage(this.pager[0]);
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

    protected goLast(): void {
        this.goToPage(this.pager[this.pager.length - 1]);
    }

    private goToPage(pageNum: number): void {
        this.pageSelected.emit(pageNum);
    }
}