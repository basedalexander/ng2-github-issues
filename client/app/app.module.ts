import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GithubIssuesComponent } from './github-issues/issues.component';
import { IssueDetailsComponent } from './github-issues/issue-details.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ContactsComponent,
        GithubIssuesComponent,
        IssueDetailsComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
