import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countPeople'
})
export class CountPeoplePipe implements PipeTransform {

  transform(people:any[]): number {
    let count = people.length
    return count
  }

}
