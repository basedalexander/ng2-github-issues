import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { GithubReposSearchService } from './github-repos.service';
import { LoggerService } from '../../shared/services/logger.service';

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
            name="user"
            type="text"
            #user
            class="form-control"
            (focus)="searchForSuggestion(user.value)"
            (keyup)="searchForSuggestion(user.value)"
            placeholder="User">
      </div>
      
      <div class="form-group">
        <label class="sr-only" for="exampleInputPassword3">Password</label>
        <input
            [(ngModel)]="searchData.repo"
            name="reposName"
            type="text"
            class="form-control"
            placeholder="Repository">
      </div>
      
      <button (click)="onSearchPressed()" class="btn btn-default">Search</button>
    </form>
    
    <div>
        <ul class="search-suggestion-list">
            <li
                *ngFor="let repo of suggestions"
                class="search-suggestion-item"
                (click)="chooseRepo(repo.name)">
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
    providers: [GithubReposSearchService]
})
export class SearchBoxComponent {
    @Input() searchData: IRepositoryData;

    @Output() searchDataChanged: EventEmitter<IRepositoryData> = new EventEmitter<IRepositoryData>();

    @Output() searchSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private githubRepos: GithubReposSearchService,
                private logger: LoggerService) {
    }

    protected suggestions: IRepository[] = [];

    protected chooseRepo(repoName: string): void {
        this.clearSuggestions();
        this.searchData.repo = repoName;
    }

    protected onSearchPressed(): void {
        this.searchDataChanged.emit(this.searchData);
        this.searchSubmitted.emit(true);
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
}