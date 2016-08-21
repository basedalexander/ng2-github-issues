import { Routes, RouterModule } from '@angular/router';

import { GithubIssuesComponent } from './github-issues/issues.component';
import { GithubIssueDetailsComponent } from './github-issue-details/github-issue-details.component';

const appRoutes: Routes = [
    { path: 'github-issues', component: GithubIssuesComponent },
    { path: 'dick-big', component: GithubIssueDetailsComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
