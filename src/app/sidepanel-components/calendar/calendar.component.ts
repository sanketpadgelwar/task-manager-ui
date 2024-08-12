import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskDTO } from '../../Functions/dto/task.dto';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: { day: number; hasEvent: boolean; eventTitles: string[] }[][] = [];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentDate = new Date();
  month: string = this.monthNames[this.currentDate.getMonth()];
  year: number = this.currentDate.getFullYear();

  tasks: TaskDTO[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.month = this.monthNames[this.currentDate.getMonth()];
    this.year = this.currentDate.getFullYear();
    this.generateCalendar(
      this.currentDate.getMonth(),
      this.currentDate.getFullYear()
    );
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
      this.generateCalendar(this.monthNames.indexOf(this.month), this.year);
    });
  }

  generateCalendar(month: number, year: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.calendar = [];
    let week: { day: number; hasEvent: boolean; eventTitles: string[] }[] = [];

    for (let i = 0; i < firstDay; i++) {
      week.push({ day: 0, hasEvent: false, eventTitles: [] });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const events = this.getEvents(day);
      const hasEvent = events.length > 0;
      const eventTitles = events.map((event) => event.taskName);
      if (week.length === 7) {
        this.calendar.push(week);
        week = [];
      }
      week.push({ day, hasEvent, eventTitles });
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ day: 0, hasEvent: false, eventTitles: [] });
      }
      this.calendar.push(week);
    }
  }

  prevMonth() {
    const currentMonth = this.monthNames.indexOf(this.month);
    if (currentMonth === 0) {
      this.year--;
      this.month = this.monthNames[11];
    } else {
      this.month = this.monthNames[currentMonth - 1];
    }
    this.generateCalendar(this.monthNames.indexOf(this.month), this.year);
    this.loadTasks();
  }

  nextMonth() {
    const currentMonth = this.monthNames.indexOf(this.month);
    if (currentMonth === 11) {
      this.year++;
      this.month = this.monthNames[0];
    } else {
      this.month = this.monthNames[currentMonth + 1];
    }
    this.generateCalendar(this.monthNames.indexOf(this.month), this.year);
    this.loadTasks();
  }

  selectDate(day: number) {
    if (day !== 0) {
      alert(`Selected date: ${day} ${this.month} ${this.year}`);
    }
  }

  getEvents(day: number): TaskDTO[] {
    return this.tasks.filter(
      (task) =>
        new Date(task.deadline).getDate() === day &&
        new Date(task.deadline).getMonth() ===
          this.monthNames.indexOf(this.month) &&
        new Date(task.deadline).getFullYear() === this.year
    );
  }

  isWeekday(date: { day: number; hasEvent: boolean }): boolean {
    const dayOfWeek = new Date(
      this.year,
      this.monthNames.indexOf(this.month),
      date.day
    ).getDay();
    return date.day !== 0 && dayOfWeek >= 1 && dayOfWeek <= 5;
  }

  isWeekend(date: { day: number; hasEvent: boolean }): boolean {
    const dayOfWeek = new Date(
      this.year,
      this.monthNames.indexOf(this.month),
      date.day
    ).getDay();
    return date.day !== 0 && (dayOfWeek === 0 || dayOfWeek === 6);
  }

  generateDateImage(day: number): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60">
                   <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold"  fill="#000">${day}</text>
                 </svg>`;
    return btoa(svg);
  }
}
