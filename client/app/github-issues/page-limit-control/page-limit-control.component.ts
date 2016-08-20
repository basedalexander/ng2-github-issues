import {
    Component,
    EventEmitter,
    Output,
    Input,
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
                [value]="_value" 
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
    @Input() set value(value: number) {
        this._value = value;
    }
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
    }

    protected currentLimit: number;
    protected allLimits: number[];

    protected onChange(value: number): void {
       this.valueChange.emit(value);
    }

    private _value: number;
}