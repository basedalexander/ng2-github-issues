import { PaginationService } from './pagination.service';
import { ILink } from '../../../shared/services/headers-parser.service';

describe('PaginationService', () => {
    let paginationService: PaginationService;

    beforeEach(() => {
        paginationService = new PaginationService();
    });

    it(`should define current page`, () => {
        // TODO test case with link is undefined

        let link: ILink = {
            next: 2,
            last: 50
        };

        expect(paginationService.getCurrentPage(link)).toEqual(1);

        link = {
            prev: 9,
            first: 1
        };

        expect(paginationService.getCurrentPage(link)).toEqual(10);
    });

    describe('generatePager', () => {
        const PAGES_NUM: number = 10;
        let link: ILink;

        it(`for the 1st page of ${PAGES_NUM}`, () => {
            link = {
                next: 2,
                last: PAGES_NUM
            };
            expect(paginationService.generatePager(link)).toEqual(createArrayOfNumbers(1));
        });

        it(`for the 2nd page of ${PAGES_NUM}`, () => {
            link = {
                prev: 1,
                last: PAGES_NUM
            };
            expect(paginationService.generatePager(link)).toEqual(createArrayOfNumbers(1));
        });

        it(`for the 3rd page of ${PAGES_NUM}`, () => {
            link = {
                prev: 2,
                last: PAGES_NUM
            };
            expect(paginationService.generatePager(link)).toEqual(createArrayOfNumbers(1));
        });

        it(`for the 4th page of ${PAGES_NUM}`, () => {
            link = {
                prev: 3,
                last: PAGES_NUM
            };
            expect(paginationService.generatePager(link)).toEqual(createArrayOfNumbers(1));
        });

        it(`for the 5th page of ${PAGES_NUM}`, () => {
            link = {
                prev: 4,
                last: PAGES_NUM
            };
            expect(paginationService.generatePager(link)).toEqual(createArrayOfNumbers(1));
        });

        xit(`for the 6th page of ${PAGES_NUM}`, () => {
            link = {
                prev: 5,
                last: PAGES_NUM
            };
            expect(paginationService.generatePager(link)).toEqual(createArrayOfNumbers(1));
        });
    });

    describe('isPrevAvailable', () => {
        it('should return false if curent page is first most page', () => {
            expect(paginationService.isPrevAvailable([1, 2, 3, 4], 1)).toBe(false);
        });

        it('should return true if curent page has previos pages', () => {
            expect(paginationService.isPrevAvailable([1, 2, 3, 4], 2)).toBe(true);
        });

        it('should return true if current page is the last', () => {
            expect(paginationService.isPrevAvailable([1, 2, 3, 4], 4)).toBe(true);
        });
    });

    describe('isNextAvailable', () => {
        it('should return false if the current page is the last', () => {
            expect(paginationService.isNextAvailable([1, 2, 3, 4], 4)).toBe(false);
        });

        it('should return true if curent page has pages after it', () => {
            expect(paginationService.isNextAvailable([1, 2, 3, 4], 2)).toBe(true);
        });

        it('should return true if current page is the first', () => {
            expect(paginationService.isNextAvailable([1, 2, 3, 4], 1)).toBe(true);
        });
    });
});

function createArrayOfNumbers(num: number, length: number = 10): number[] {
    let arr = [];
    let startNumber: number = num;

    for( let i = 0; i < length; i++) {
        arr.push(startNumber++);
    }

    return arr;
}