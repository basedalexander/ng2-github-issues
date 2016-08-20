import {
    Component,
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
            (blur)="onUserFieldBlur()"
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
        this.searchData = this.DEFAULT_SEARCH_DATA;
        this.onSearchDataChanged();
    }

    protected DEFAULT_SEARCH_DATA: ISearchData = {
        user: 'angular',
        repo: 'angular'
    };

    protected suggestions: IRepository[] = [];

    protected selectRepo(repoName: string): void {
        this.searchData.repo = repoName;
        this.clearSuggestions();
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
                },
                error => {
                    this.suggestions = [];
                    this.showError(`Can't load repository list`, error.stack);
                }
            );
    }

    protected onUserFieldBlur(): void {
        setTimeout(() => this.clearSuggestions(), 500);
    }

    protected showError(message: string, stack: string): void {
        this.logger.error(message, stack);
    }

    private clearSuggestions(): void {
        this.suggestions = [];
    }

    private searchData: ISearchData;

}