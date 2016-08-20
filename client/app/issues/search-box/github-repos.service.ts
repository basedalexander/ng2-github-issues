import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IRepository } from './search-box.component';

@Injectable()
export class GithubReposSearchService {

    constructor(private http: Http) {
    }

    searchByUser(user: string): Observable<IRepository[]> {
        let url = this.createUrlForUser(user);

        return  this.http.get(url)
            .map(res => res.json());
        }

    private createUrlForUser(user: string): string {
        return `https://api.github.com/users/${user}/repos`;
    }
}