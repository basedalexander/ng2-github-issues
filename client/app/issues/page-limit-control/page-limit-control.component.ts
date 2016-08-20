import { Component } from '@angular/core';

import { IssuesService } from '../../shared/services/github-issues.service';

@Component({
    selector: 'page-limit-controll',
    template:
    `
   <div class="form-inline">
        <div class="form-group">
            <label for="selectbox-per-page">Per page</label>
            <select class="form-control"
                name="limitPerPage"
                [value]="limitPerPage" 
                #select
                id="selectbox-per-page"
                (change)="onChange(select.value)">
                <option *ngFor="let limit of limitsPerPage" [value]="limit">{{limit}}</option>
            </select>
        </div>
    </div>
    `
})
export class PageLimitControl {
    constructor(private issuesService: IssuesService) {
        this.limitsPerPage = [
            1,
            5,
            10,
            30,
            50,
            100
        ];
    }

    get limitPerPage(): number {
        return this.issuesService.limitPerPageDefault;
    }

    protected limitsPerPage: number[] = [];

    protected onChange(value: number): void {
        this.issuesService.limitPerPageDefault = value;
    }
}