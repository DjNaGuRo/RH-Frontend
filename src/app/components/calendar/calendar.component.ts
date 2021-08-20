import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { Collaborator } from 'src/app/model/collaborator'
import { DayOff } from 'src/app/model/dayOff'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth!: number
  currentMonthLetter!: string
  currentYear = moment().year()
  daysOffMonth?: string[]
  collaborators?: Collaborator[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDaysArrayByMonth(moment().month())
    this.userService.getCollaborator().subscribe(collaborators => this.collaborators = collaborators)
  }

  getDaysArrayByMonth(monthChoice: number) {

    if (monthChoice < 0) {
      monthChoice = 11
      this.currentYear -= 1
    }
    if (monthChoice > 11) {
      monthChoice = 0
      this.currentYear += 1
    }
    var daysInMonth = moment([this.currentYear, monthChoice]).daysInMonth()
    var arrDays = []

    while (daysInMonth) {
      var current = moment([this.currentYear, monthChoice]).date(daysInMonth)
      arrDays.push(current)
      daysInMonth--
    }
    let daysOffMonthFormat: string[] = []
    let currentMonth: number
    currentMonth = parseInt(arrDays[0].format("MM"))
    this.currentMonthLetter = arrDays[0].locale("fr").format("MMMM")
    arrDays.forEach(function (item) {
      daysOffMonthFormat.push(item.locale("fr").format("DD/MM"))
    })
    this.currentMonth = currentMonth
    daysOffMonthFormat.reverse()
    this.daysOffMonth = daysOffMonthFormat

  }
  testCollaborator() {
    console.log(this.collaborators)
  }
  compareDate(date: string): boolean {
    if (this.collaborators) {
      for (const collaborator of this.collaborators) {
        for (const dayOff of collaborator.daysOffs) {
          if (dayOff.startDate.includes(date)) {
            return true;
          }
        }
      }
    }
    return false
  }
  // console.log(dayOff)
  // console.log(date)
}
