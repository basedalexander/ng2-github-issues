import { provideRouter, Routes } from '@angular/router';

import { GithubIssuesComponent } from './github-issues/issues.component';
import { GithubIssueDetailsComponent } from './github-issue-details/github-issue-details.component';

const routes: Routes = [
    { path: 'github-issues', component: GithubIssuesComponent },
    { path: 'dick-big', component: GithubIssueDetailsComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];
