import { Injectable } from '@angular/core';

@Injectable()
export class IssuesListService {

    scrollToTop(): void {
        scrollTo(0, 0);
    }
}