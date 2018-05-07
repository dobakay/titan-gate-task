import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-event-form',
    templateUrl: './eventform.component.html',
    styleUrls: ['./eventform.component.scss'],
    animations: [
        trigger('eventform', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class EventFormComponent implements OnInit {

    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() date: any;

    enableFormFlag: boolean;
    createEventFlag: boolean;

    currentlyDisplayedEvent: Object;
    currentlyDisplayedEventIndex: number;

    constructor() {
        // this.newFormToSubmit = {};
        this.enableFormFlag = false;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.currentlyDisplayedEventIndex = 0;
        this.setCurrentlyDisplayedEvent();
    }

    nextEvent() {
        if(this.currentlyDisplayedEventIndex < this.date.events.length - 1) {
            this.currentlyDisplayedEventIndex++;
            this.setCurrentlyDisplayedEvent();
        }
    }

    previousEvent() {
        if(this.currentlyDisplayedEventIndex > 0) {
            this.currentlyDisplayedEventIndex--;
            this.setCurrentlyDisplayedEvent();
        }
    }

    private setCurrentlyDisplayedEvent() {
        if(!!this.date && this.date.events.length !== 0) {
            this.currentlyDisplayedEvent = this.date.events[this.currentlyDisplayedEventIndex];
        } else {
            this.currentlyDisplayedEvent = {};
        }
    }

    addNewEvent() {
        this.enableFormFlag = true;
        this.createEventFlag = true;
        this.currentlyDisplayedEvent = {};
    }

    createEvent(edit:boolean) {
        if(edit) {
            // this.date.events[this.currentlyDisplayedEventIndex] = this.currentlyDisplayedEvent;
            this.enableFormFlag = false;
        } else {
            this.date.events.splice(++this.currentlyDisplayedEventIndex, 0, this.currentlyDisplayedEvent);
            this.enableFormFlag = false;
            this.createEventFlag = false;
            if(this.date.events.length === 1) {
                this.currentlyDisplayedEventIndex--;
            }
            this.dateChange.emit(this.date);
        }
    }

    enableForm() {
        this.enableFormFlag = true;
    }

    deleteCurrentEvent() {
        this.date.events.splice(this.currentlyDisplayedEventIndex, 1);
        if(this.date.events.length !== 0) {
            this.currentlyDisplayedEvent = this.date.events[--this.currentlyDisplayedEventIndex];
            if(this.currentlyDisplayedEventIndex < 0) {
                this.currentlyDisplayedEventIndex = 0;
            }
        } else {
            this.currentlyDisplayedEvent = {};
        }
        this.dateChange.emit(this.date);
    }

    cancelEventSubmition() {
        this.enableFormFlag = false;
        this.setCurrentlyDisplayedEvent();
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

}