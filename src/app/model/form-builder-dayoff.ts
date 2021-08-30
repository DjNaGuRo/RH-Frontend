import {FormControl, FormGroup} from "@angular/forms";
import {DayOffTypeEnum} from "../enum/dayoff-type-enum";
import {DayOff} from "./dayOff";

export abstract class FormBuilderDayoff {
  public static getDayoff = getDayoff;
}

function getDayoff(value: { reason: string; endDate: string; type: DayOffTypeEnum; startDate: string }): FormGroup {
  value = value || {
    type: null,
    startDate: null,
    endDate: null,
    reason: null
  }
  return new FormGroup({
    type: new FormControl(value.type),
    startDate: new FormControl(value.startDate),
    endDate: new FormControl(value.endDate),
    reason: new FormControl(value.reason)
  })
}
