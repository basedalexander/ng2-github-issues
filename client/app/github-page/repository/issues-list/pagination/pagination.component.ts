import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { ILink } from 'common/services';
import { PaginationService, FIRST_PAGE } from './pagination.service';

@Component({
    selector: 'pagination',
    moduleId: module.id,
    templateUrl: `./pagination.component.html`,
    styleUrls: [`./pagination.component.css`],
    providers: [PaginationService]
})
export class PaginationComponent {

    @Input() set link(value: ILink) {
        this.init(value);
    }

    @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(private paginationService: PaginationService) {
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