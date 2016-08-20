import { HeadersParserService } from './headers-parser.service';

describe('HeaderParserService', () => {

   let headersParser: HeadersParserService;

   beforeEach(() => {
      headersParser = new HeadersParserService();
   });

   it(`should return undefined if 'Link' isn't present in headers`, () => {
      let headers = {
         _headersMap: new Map()
      };

      expect(headersParser.parse(headers)).toEqual({
         link: undefined
      });
   });

   it(`should parse Link header properly`, () => {
      let headers = {
         _headersMap: new Map<string, string[]>()
      };

      headers._headersMap.set('link', [
          `<https://api.github.com/repositories/24195339/issues?page=2&per_page=1>; rel="next",` +
          `<https://api.github.com/repositories/24195339/issues?page=1125&per_page=1>; rel="last", ` +
          `<https://api.github.com/repositories/24195339/issues?page=1&per_page=1>; rel="first",` +
          `<https://api.github.com/repositories/24195339/issues?page=5&per_page=1>; rel="prev"`
          ]
      );

      expect(headersParser.parse(headers)).toEqual({
         link: {
            next: 2,
            last: 1125,
            first: 1,
            prev: 5
         }
      });
   });
});