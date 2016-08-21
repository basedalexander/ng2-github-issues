import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RepositoryComponent } from './github-page/repository/repository.component';

import { routing, appRoutingProviders } from './app.routing';
import { GithubPageModule } from './github-page/github-page.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        GithubPageModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
