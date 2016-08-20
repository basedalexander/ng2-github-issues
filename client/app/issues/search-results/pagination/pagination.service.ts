import { Injectable } from '@angular/core';
import { ILink } from '../../../shared/services/headers-parser.service';

const PAGER_LENGTH_MAX: number = 10;

export type PagerType = number[];

@Injectable()
export class PaginationService {

    generatePager(link: ILink): PagerType {
        const firstPage: number = link.first;
        const lastPage: number = this.getLastPage(link);
        const currentPage: number = this.getCurrentPage(link);

        let pager: PagerType = [];

        const pagerLength: number = this.getPagerLength(lastPage);

        if (pagerLength === 1) {
            return pager;
        }

        let startPage: number = this.calcPagerStartPage(firstPage, lastPage, currentPage, pagerLength);

        for (let i = 0; i < pagerLength; i++) {
            pager.push(startPage + i);
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

    private calcPagerStartPage(firstPage: number, lastPage: number, currentPage: number, pagerLength: number): number {

        let centerPos: number = this.calcCentralIndex(pagerLength);

        let startPage: number;

        let diffToLast = lastPage - currentPage;

        if (currentPage <= centerPos) {
            startPage = 1;
        }

        else if (diffToLast < centerPos) {
            startPage = currentPage - centerPos - diffToLast;
        }

        else {
            startPage = currentPage - centerPos;
        }

        return startPage;
    }

    private getLastPage(link: ILink): number {
        return link.last || link.prev + 1;
    }

    private getPagerLength(lastPage: number): number {
        return lastPage < PAGER_LENGTH_MAX ? lastPage : PAGER_LENGTH_MAX;
    }

    private calcCentralIndex(pagerLength): number {
        return Math.floor(pagerLength / 2);
    }
}
