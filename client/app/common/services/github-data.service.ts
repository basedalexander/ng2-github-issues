import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HeadersParserService, ILink } from './headers-parser.service';

const ENDPOINT = 'https://api.github-page.com/repos/';

export interface IIssuesResponse {
    link: ILink;
    data: Object[];
}

export interface IIssuesSearchData {
    user: string;
    repo: string;
}

export interface IRepositorySearchData {
    name: string;
}

@Injectable()
export class GithubDataService {
    constructor(private http: Http,
                private headersParser: HeadersParserService) {
    }

    getIssues(searchData: IIssuesSearchData, resultsPerPage: number, pageNumber: number): Observable<IIssuesResponse> {
        const url = this.createUrl(searchData, resultsPerPage, pageNumber);

        return this.http.get(url)
            .map((res: Response) => {
                const link = this.headersParser.parse(res.headers).link;
                return {
                    link,
                    data: res.json()
                };
            })
            .catch(err => Observable.throw(err));
    }

    // TODO create url creator
    private createUrl(searchData, resultsPerPage: number, pageNumber: number = 1): string {
        return `${ENDPOINT}${searchData.user}/${searchData.repo}/issues?page=${pageNumber}&per_page=${resultsPerPage}`;
    }

    getRepos(user: string): Observable<IRepositorySearchData[]> {
        let url: string = `https://api.github.com/users/${user}/repos`;

        return this.http.get(url)
            .map(res => res.json());
    }
}