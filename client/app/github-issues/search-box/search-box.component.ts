import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {
    GithubReposModel,
    LoggerService,
    ISearchData
} from 'common/services';

export interface IRepositoryData {
    user: string;
    repo: string;
}

export interface IRepository {
    name: string;
}

@Component({
    selector: 'search-box',
    template: `
    <form class="form-inline">
    
      <div class="form-group">
        <label class="sr-only" for="exampleInputEmail3">Email address</label>
        <input
            [(ngModel)]="searchData.user"
            (change)="onSearchDataChanged()"
            name="user"
            type="text"
            #user
            class="form-control"
            (focus)="searchForSuggestion(user.value)"
            (keyup)="searchForSuggestion(user.value)"
            placeholder="User"
            autocomplete="off">
      </div>
      
      <div class="form-group">
        <label class="sr-only" for="exampleInputPassword3">Password</label>
        <input
            [(ngModel)]="searchData.repo"
            (change)="onSearchDataChanged()"
            name="reposName"
            type="text"
            class="form-control"
            placeholder="Repository"
            autocomplete="off">
      </div>
      
      <button (click)="submitSearch()" class="btn btn-default">Search</button>
    </form>
    
    <div>
        <ul class="search-suggestion-list">
            <li
                *ngFor="let repo of suggestions"
                class="search-suggestion-item"
                (click)="selectRepo(repo.name)">
                /{{repo.name}}
            </li> 
        </ul>
    </div>
    `,
    styles: [
        `
    .search-suggestion-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        width: 300px;
    }
    
    .search-suggestion-item {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        background-color: #fff;
        
        padding: 6px 10px;
        cursor: pointer;
    }
    
    .search-suggestion-item:hover {
        background-color: rgba(0,0,0,.05);
    }
    `
    ],
    providers: [GithubReposModel]
})
export class SearchBoxComponent {
    @Output() searchDataChanged: EventEmitter<ISearchData> = new EventEmitter<ISearchData>();

    @Output() searchSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private githubRepos: GithubReposModel,
                private logger: LoggerService) {
    }

    ngOnInit() {
        this.searchData = this.SEARCH_DATA_DEFAULT;
        this.onSearchDataChanged();
    }

    protected SEARCH_DATA_DEFAULT: ISearchData = {
        user: 'thohoh',
        repo: 'metadata'
    };

    protected suggestions: IRepository[] = [];

    protected selectRepo(repoName: string): void {
        this.clearSuggestions();
        this.searchData.repo = repoName;
    }

    protected submitSearch(): void {
        this.searchSubmitted.emit(true);
    }

    protected onSearchDataChanged(): void {
         this.searchDataChanged.emit(this.searchData);
    }

    protected searchForSuggestion(user: string): void {
        if (!user) {
            this.clearSuggestions();
            return;
        }

        this.githubRepos.searchByUser(user)
            .subscribe(
                data => {
                    this.suggestions = data;
                    this.logger.log(data);
                },
                () => {
                    this.suggestions = [];
                    this.showError();
                }
            );
    }

    protected showError(): void {
        this.logger.error(`Can't load repository list`);
    }

    private clearSuggestions(): void {
        this.suggestions = [];
    }

    private searchData: ISearchData;

}