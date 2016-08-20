import { provideRouter, Routes } from '@angular/router';

import { GithubIssuesComponent } from './issues/issues.component';
import { IssueDetailsComponent } from './issues/issue-details.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'issues', component: GithubIssuesComponent },
    { path: 'issue', component: IssueDetailsComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];
