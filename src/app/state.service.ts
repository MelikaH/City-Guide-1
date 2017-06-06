/**
 * Created by denis on 6/5/2017.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
  private choice = 'Sarajevo';

  getChoice(): string {
    return this.choice;
  };


  setChoice(newCohice: string): void {
    this.choice = newCohice;
  };
}
