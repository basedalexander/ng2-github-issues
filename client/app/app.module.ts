import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GithubIssuesComponent } from './github-issues/issues.component';
import { GithubIssueDetailsComponent } from './github-issue-details/github-issue-details.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        GithubIssuesComponent,
        GithubIssueDetailsComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
