import { Component } from '@angular/core';
import { RouterOutletMap, Router } from '@angular/router';

import { IssuesService } from './shared/services/github-issues.service';
import { GithubIssuesComponent } from './issues/issues.component';
import { HeadersParserService } from './shared/services/headers-parser.service';
import { LoggerService } from './shared/services/logger.service';

import { appRouterProviders } from './app.routes';

@Component({
    selector: 'app',
    template: `
    <nav class='main-nav'>
        <ul class='nav-list'>
            <li class='nav-list_item'>
                <a class='nav-link' routerLink="" routerLinkActive="active">Home</a>
            </li>

            <li class='nav-list_item'>
                <a class='nav-link' routerLink="issues" routerLinkActive="active">Issues</a>
            </li>

            <li class='nav-list_item'>
                <a class='nav-link' routerLink="about" routerLinkActive="active">About</a>
            </li>

            <li class='nav-list_item'>
                <a class='nav-link' routerLink="contacts" routerLinkActive="active">Contacts</a>
            </li>
        </ul>
    </nav>

    <div>
        <router-outlet></router-outlet>
    </div>
    
    `,
    providers: [
        IssuesService,
        HeadersParserService,
        LoggerService,
        RouterOutletMap,
        appRouterProviders
    ],
    directives: [
        GithubIssuesComponent
    ],
    styles: [
        `
    .main-nav {
        padding: 5px;
        border-bottom: 1px solid #ccc;
    }

    .nav-list {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    .nav-list_item {
        display: inline-block;
        margin-right: 25px;
    }
    .nav-link {
        color: #ccc;	
        cursor: pointer;
    }

    .nav-link.active {
        color: #000;
    }

    .nav-link:hover {
        color: #000;
    }
    `
    ]
})
export class AppComponent {
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.initialNavigation();
    }
}
