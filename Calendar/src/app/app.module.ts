import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { APP_ROUTING } from './app.routing';

import { HomeComponent } from './route/home/home.component';
import { CalendarComponent } from './route/calendar/calendar.component';
import { EventFormComponent } from './route/eventform/eventform.component'
import { CalendarCellComponent } from './route/calendarcell/calendarcell.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTING,
        BrowserAnimationsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CalendarComponent,
        EventFormComponent,
        CalendarCellComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}