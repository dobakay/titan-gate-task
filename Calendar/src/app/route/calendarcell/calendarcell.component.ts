import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-calendar-cell',
    templateUrl: './calendarcell.component.html',
    styleUrls: ['./calendarcell.component.scss']
})
export class CalendarCellComponent implements OnInit {

    @Input() date: any;
    @Output() cellClickEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    };

    clickEvent() {
        this.cellClickEvent.emit(this.date);
    }

    checkIfToday() {
        var today = new Date(Date.now());
        return ((this.date.day === today.getDate()) &&
                (this.date.month === today.getMonth() + 1) &&
                (this.date.year === today.getFullYear())); 
    }

}