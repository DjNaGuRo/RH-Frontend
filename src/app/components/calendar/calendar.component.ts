import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { Collaborator } from 'src/app/model/collaborator'
import { DayOff } from 'src/app/model/dayOff'
import { UserService } from 'src/app/services/user.service'
interface CollaboratorCalendar extends Collaborator {
    daysOffMonth:(DayOff | null)[]
}
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
  daysOffToInclude = new Map<number, DayOff>()
  collaboratorsCalendar:CollaboratorCalendar[] = []
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCollaborator().subscribe(collaborators => {
      this.collaborators = collaborators
      this.getDaysArrayByMonth(moment().month())
    })

  }

  getDaysArrayByMonth(monthChoice: number) {
    this.collaboratorsCalendar = []
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
    arrDays.reverse()
    let daysOffMonthFormat: string[] = []
    let currentMonth: number
    currentMonth = parseInt(arrDays[0].format("MM"))
    this.currentMonthLetter = arrDays[0].locale("fr").format("MMMM")
    if (this.collaborators) {
      for (const collaborator of this.collaborators) {
        const collabCalendar:CollaboratorCalendar = {
          ...collaborator,
          daysOffMonth : []
        }
        for (const day of arrDays) {
          let dayOffFind = false
          for (const dayOff of collaborator.daysOffs) {
            if (dayOff.startDate === day.locale("fr").format("DD/MM/YYYY")) {
              collabCalendar.daysOffMonth.push(dayOff)
              dayOffFind = true
            }
          }
          if (!dayOffFind) {
            collabCalendar.daysOffMonth.push(null)
          }
        }
        this.collaboratorsCalendar.push(collabCalendar)
      }
      for (const day of arrDays) {
        daysOffMonthFormat.push(day.locale("fr").format("dd \n DD/MM"))
      }
    }
    console.log(this.collaboratorsCalendar);

    this.currentMonth = currentMonth
    daysOffMonthFormat
    this.daysOffMonth = daysOffMonthFormat

  }
  testCollaborator() {
    console.log(this.collaborators)
  }
  compareDate(date: string): DayOff | null {
    if (this.collaborators) {
      for (const collaborator of this.collaborators) {
        for (const dayOff of collaborator.daysOffs) {
          if (dayOff.startDate.includes(date)) {
            return dayOff;
          }
        }
      }
    }
    return null
  }
  // console.log(dayOff)
  // console.log(date)
}
