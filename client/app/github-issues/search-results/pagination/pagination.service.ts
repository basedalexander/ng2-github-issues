import { Injectable } from '@angular/core';

import { ILink } from 'common/services';
import { isBlank } from 'common/utils';

const PAGER_LENGTH: number = 10;
const PAGER_MIDDLE: number = PAGER_LENGTH / 2;
export const FIRST_PAGE: number = 1;

export type PagerType = number[];

@Injectable()
export class PaginationService {

    generatePager(link: ILink): PagerType {
        let pager: PagerType = [];

        if (isBlank(link)) {
            return pager;
        }

        let lastPage: number = this.getLastPage(link);
        let currentPage: number = this.getCurrentPage(link);

        let diffLast: number = lastPage - currentPage;
        let diffFirst: number = currentPage - FIRST_PAGE;

        // Case 1: Current page in the middle
        if ((diffFirst > PAGER_MIDDLE) && (PAGER_MIDDLE < diffLast)) {
            let pagerFirstPage: number = currentPage - PAGER_MIDDLE;

            for (let i = 0, page = pagerFirstPage; i < PAGER_LENGTH; i++, page++) {
                pager.push(page);
            }
        }

        // Case 2: There are just 10 pages.
        else if ((diffFirst <= PAGER_MIDDLE) || (diffFirst + diffLast) < PAGER_LENGTH) {
            let length: number = (PAGER_LENGTH < lastPage) ? PAGER_LENGTH : lastPage;

            for (let pageNum = FIRST_PAGE; pageNum <= length; pageNum++) {
                pager.push(pageNum);
            }
        }

        // Case 3: Near the last page
        else if (diffLast < PAGER_MIDDLE) {
            let firstInPager: number = (currentPage - (PAGER_LENGTH - diffLast )) + 1;

            if (firstInPager < FIRST_PAGE) {
                firstInPager = FIRST_PAGE;
            }

            for (let i = firstInPager; i <= lastPage; i++) {
                pager.push(i);
            }
        }

        return pager;
    }

    getCurrentPage(link: ILink): number {
        let currentPage: number;

        if (link.next) {
            currentPage = link.next - 1;
        }
        else if (link.prev) {
            currentPage = link.prev + 1;
        }

        return currentPage;
    }

    isPrevAvailable(pager: number[], currentPage: number): boolean {
        return pager.indexOf(currentPage) !== 0;
    }

    isNextAvailable(pager: number[], currentPage: number): boolean {
        return pager.indexOf(currentPage) !== (pager.length - 1);
    }

    getLastPage(link: ILink): number {
        return link.last || link.prev + 1;
    }
}
