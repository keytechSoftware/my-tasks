import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
// ------------------------------------------------------------------
// Converts the specified object to an array
// ------------------------------------------------------------------ 
export class KeysPipe implements PipeTransform {

  transform(value, args:string[]) : any { 
    let keys = [];
    for (let key in value) {
         keys.push(key);
    }
    return keys;
  }
}

// ------------------------------------------------------------------
// Converts the specified list of objects into a list of KeyValue arrays
// ------------------------------------------------------------------ 
@Pipe({
  name: 'keys2'
})
export class KeyValuePipe implements PipeTransform {

   transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}