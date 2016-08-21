import { Component } from '@angular/core';

import {
    GithubDataService,
    HeadersParserService,
    LoggerService
} from 'common/services';

import { GithubIssuesComponent } from './github-issues/issues.component';

@Component({
    selector: 'app',
    template: `
    <a routerLink="dick-big" routerLinkActive="active">dick</a>
    <div>
        <router-outlet></router-outlet>
    </div>
    `,
    providers: [
        GithubDataService,
        HeadersParserService,
        LoggerService
    ],
    directives: [
        GithubIssuesComponent
    ]
})
export class AppComponent {

}
