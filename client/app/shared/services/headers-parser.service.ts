import { Injectable } from '@angular/core';

import { isPresent } from 'shared/utils';

export interface IResponseHeaders {
    _headersMap: Map<string, Array<string>>;
}

export interface IParsedHeaders {
    link: ILink;
}

export interface ILink {
    next?: number;
    prev?: number;
    first?: number;
    last?: number;
}

const LINK_HEADER_NAME = 'link';

@Injectable()
export class HeadersParserService {


    parse(headers: Object): IParsedHeaders {
        let linkHeader = headers['_headersMap'].get(LINK_HEADER_NAME);

        let link: ILink = undefined;

        if (isPresent(linkHeader)) {
            link = this.parseLink(linkHeader);
        }

        return {
            link
        };
    }

    private parseLink(linkData: string[]): ILink {
        return this.retrieveLinkData(linkData[0]);
    }

    private retrieveLinkData(link: string): ILink {
        const searchRelValue: RegExp = /rel="(\w+)"/;
        const searchForPageNumber: RegExp = /page=(\d+)/;

        const data: string[] = link.split(',');

        let parsedLink: ILink = {};

        data.forEach(elem => {
            let rel = <string>elem.match(searchRelValue)[1];
            parsedLink[rel] = <number>+elem.match(searchForPageNumber)[1];
        });

        return parsedLink;
    }
}