import {
    Component,
    EventEmitter,
    Output,
    OnInit
} from '@angular/core';

@Component({
    selector: 'results-per-page-control',
    template:
    `
   <div class="form-inline">
        <div class="form-group">
            <label for="selectbox-per-page">Results per page</label>
            <select class="form-control"
                name="currentLimit"
                [value]="currentLimit" 
                #select
                id="selectbox-per-page"
                (change)="onChange(select.value)">
                <option *ngFor="let limit of allLimits" [value]="limit">{{limit}}</option>
            </select>
        </div>
    </div>
    `
})
export class ResultsPerPageControl implements OnInit {
    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit() {
        this.allLimits = [
            1,
            2,
            3,
            4,
            5,
            10,
            30,
            50,
            100
        ];

        this.currentLimit = this.allLimits[5];
        this.onChange(this.currentLimit);
    }

    protected currentLimit: number;
    protected allLimits: number[];

    protected onChange(value: number): void {
       this.valueChange.emit(value);
    }
}