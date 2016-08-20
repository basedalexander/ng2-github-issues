import { Component } from '@angular/core';
import { RouterOutletMap, Router } from '@angular/router';

import {
    GithubIssuesModel,
    HeadersParserService,
    LoggerService
} from 'common/services';

import { GithubIssuesComponent } from './github-issues/issues.component';
import { appRouterProviders } from './app.routes';

@Component({
    selector: 'app',
    template: `
    <a routerLink="dick-big" routerLinkActive="active">dick</a>
    <div>
        <router-outlet></router-outlet>
    </div>
    `,
    providers: [
        GithubIssuesModel,
        HeadersParserService,
        LoggerService,
        RouterOutletMap,
        appRouterProviders
    ],
    directives: [
        GithubIssuesComponent
    ]
})
export class AppComponent {
    constructor(private router: Router) {
    }

    printThis() {
        console.log(this);
    }

    ngOnInit() {
        this.router.navigateByUrl('/github-issues');
    }
}
