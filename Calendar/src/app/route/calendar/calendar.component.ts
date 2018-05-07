import { Component, OnInit, Renderer, ElementRef, ViewChild} from '@angular/core';
import { CalendarDay } from './calendarday';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('monthYearLable') monthYearLabel: ElementRef;

  private months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  private cache = {};
  currentCalendarGrid:Array<any> = [];
  monthLabel = "";
  displayEventContainerVisible: boolean;
  displayDate:any;

  showDialog = false;

  constructor(private renderer: Renderer) {
  }

  ngOnInit() {
    this.cache = JSON.parse(localStorage.getItem('userEvents')) || {};
    this.monthYearLabel.nativeElement.click();
    console.log(this.cache);
  };

  switchMonth(next:Boolean, month:any, year:any) {
    if(next === null) {
      month = (new Date()).getMonth();
      year = (new Date()).getFullYear();
    }

    var curr = this.monthLabel.split(" "),
        calendar,
        tempYear = parseInt(curr[1], 10);

    if (!month) {
      if (next) {
        if (curr[0] === "December") {
          month = 0;
        } else {
          month = this.months.indexOf(curr[0]) + 1;
        }
      } else {
        if (curr[0] === "January") {
          month = 11;
        } else {
          month = this.months.indexOf(curr[0]) - 1;
        }
      }
    }

    if (!year) {
      if (next && month === 0) {
        year = tempYear + 1;
      } else if (!next && month === 11) {
        year = tempYear - 1;
      } else {
        year = tempYear;
      }
    }

    var generatedOrFetchedCalendar = this.createCal(year, month);
    this.currentCalendarGrid = generatedOrFetchedCalendar.calendarGrid;
    this.monthLabel = generatedOrFetchedCalendar.label;

    // this._ngZone.run(() =>{
    // });

  };

  showEventForm(data: CalendarDay) {
    if(data.day) {
      this.displayDate = data;
      this.displayEventContainerVisible = true;
    }
  }

  createCal(year:number, month: number):any {

    var day = 1,
      weekIndex, dayIndex,
      haveDays = true,
      startDay = new Date(year, month, day).getDay(),
      daysInMonths = [31, (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      calendar:Array<Array<CalendarDay>> = [];


    if (this.cache[year]) {
      if (this.cache[year][month]) {
        return this.cache[year][month];
      }
    } else {
      this.cache[year] = {};
    }


    // create calendar grid
    weekIndex = 0;
    while (haveDays) {
      calendar[weekIndex] = [];
      for (dayIndex = 0; dayIndex < 7; dayIndex++) {
        if (weekIndex === 0) {
          if (dayIndex === startDay) {
            // generating first week
            calendar[weekIndex][dayIndex] = {
              day: day++,
              month: month + 1,
              year: year,
              events: []
            };
            startDay++;
          }
          else {
            // days that are from the past month before the first week
            calendar[weekIndex][dayIndex] = new CalendarDay(null, null, null, null);
          }
        } else if (day <= daysInMonths[month]) {
          calendar[weekIndex][dayIndex] = {
            day: day++,
            month: month + 1,
            year: year,
            events: []
          };
        } else {
          // days that are from the next month after the last week
          calendar[weekIndex][dayIndex] = new CalendarDay(null, null, null, null);
          haveDays = false;
        }
        if (day > daysInMonths[month]) {
          haveDays = false;
        }
      }
      weekIndex++;
    }

    this.cache[year][month] = { calendarGrid: calendar, label: this.months[month] + " " + year };

    return this.cache[year][month];
  };

  updateCalendar(data: CalendarDay) {
    for (let week of this.cache[data.year][data.month - 1].calendarGrid) {
      if(week[data.day-1] === data.day) {
        week[data.day-1] = data;
      }
    }
    localStorage.setItem('userEvents', JSON.stringify(this.cache));
    console.log(this.cache[data.year][data.month-1].calendarGrid[data.day-1]);
  }
}
