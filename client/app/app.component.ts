import { Component } from '@angular/core';

import {
    GithubDataService,
    HeadersParserService,
    LoggerService
} from 'common/services';

@Component({
    selector: 'app',
    template: `
    <div>
        <github-page></github-page>
    </div>
    `,
    providers: [
        GithubDataService,
        HeadersParserService,
        LoggerService
    ]
})
export class AppComponent {

}
