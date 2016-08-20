import { provideRouter, Routes } from '@angular/router';

import { GithubIssuesComponent } from './github-issues/issues.component';

const routes: Routes = [
    { path: 'github-issues', component: GithubIssuesComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];
