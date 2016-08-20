import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HeadersParserService, ILink } from './headers-parser.service';

const ENDPOINT = 'https://api.github.com/repos/';

export interface IIssuesResponse {
    link: ILink;
    data: Object[];
}

export interface ISearchData {
    user: string;
    repo: string;
}

@Injectable()
export class GithubIssuesModel {
    constructor(private http: Http,
                private headersParser: HeadersParserService) {

        this.pageNumberDefault = 1;
        this.limitPerPageDefault = 10;
    }

    limitPerPageDefault: number;
    pageNumberDefault: number;

    fetch(searchData: ISearchData, pageNumber?: number, limit?: number): Observable<IIssuesResponse> {

        const url = this.createUrl(searchData, pageNumber, limit);

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

    private createUrl(searchData, pageNumber: number = this.pageNumberDefault, limit: number = this.limitPerPageDefault): string {
        return `${ENDPOINT}${searchData.user}/${searchData.repo}/issues?page=${pageNumber}&per_page=${this.limitPerPageDefault}`;
    }
}