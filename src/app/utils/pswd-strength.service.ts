import { regexPatterns } from "./regexPatterns";
import { Observable, of } from 'rxjs';

export interface PasswordStrength {
  index: number;
  color: string;
  message: string;
}

export class PasswordStrengthService {
  private colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];

  checkStrength(password: string): number {
    let force = 0;
    const lowerLetters = regexPatterns.lowerLetters.test(password);
    const upperLetters = regexPatterns.upperLetters.test(password);
    const numbers = regexPatterns.numbers.test(password);
    const symbols = regexPatterns.symbols.test(password);

    const passedMatches = [lowerLetters, upperLetters, numbers, symbols].reduce((acc, flag) => acc + (flag ? 1 : 0), 0);

    if (password.length < 8) {
      return force;
    }

    if (passedMatches === 0) {
      return force;
    }

    force += 2 * password.length + (password.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    force = password.length <= 6 ? Math.min(force, 10) : force;

    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;

    return force;
  }

  getStrengthMessage(strength: number): Observable<PasswordStrength> {
    const index = Math.min(Math.floor(strength / 10) - 1, 3);
    const message = ['Poor', 'Not Good', 'Average', 'Good'][index] || '';
    const color = this.colors[index];

    return of({ index: index + 1, color, message });
  }
}
  