class CalendarDay { 
    day: number;
    month: number;
    year: number;
    events: any[]
    constructor(day: number, month:number, year: number, events: any[]) {
        this.day = day || null;
        this.month = month || null;
        this.year = year || null;
        this.events = events || null;
    }
}

export { CalendarDay }