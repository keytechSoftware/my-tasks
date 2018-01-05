import { Pipe, PipeTransform } from '@angular/core';

import { Tools } from "../shared/tools";

@Pipe({
  name: 'epoch2date'
})
// ------------------------------------------------------------------
// Converts the specified EPOCH date into a formatted date string
// ------------------------------------------------------------------ 
export class Epoch2datePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
        // Convert EPOCH string to date
        let date: Date = Tools.getDateFromEpoch(value);

        // Format date
        return Tools.getFormatedDateString(date);
  }
}
