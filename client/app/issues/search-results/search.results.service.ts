import { Injectable } from '@angular/core';

@Injectable()
export class SearchResultsService {

    scrollToTop(): void {
        scrollTo(0, 0);
    }
}