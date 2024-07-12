import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  styleUrls: ['./password-strength.component.scss'],
  templateUrl: './password-strength.component.html',
})
export class PasswordStrengthComponent implements OnChanges {
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  @Input() public passwordToCheck: string;

  @Output() passwordStrength = new EventEmitter<boolean>();

  private colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];

  message: string;
  messageColor: string;

  checkStrength(password: string) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    const passedMatches = [lowerLetters, upperLetters, numbers, symbols].reduce((acc, flag) => acc + (flag ? 1 : 0), 0);

    force += 2 * password.length + (password.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    force = password.length <= 6 ? Math.min(force, 10) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(4, '#DDD');

    if (password) {
      const pwdStrength = this.checkStrength(password);
      this.passwordStrength.emit(pwdStrength === 40);

      const { index, color } = this.getColor(pwdStrength);
      this.setBarColors(index, color);

      this.message = ['Poor', 'Not Good', 'Average', 'Good'][index - 1] || '';
    } else {
      this.message = '';
    }
  }

  private getColor(strength: number) {
    const index = Math.min(Math.floor(strength / 10) - 1, 3);
    this.messageColor = this.colors[index];

    return {
      index: index + 1,
      color: this.colors[index],
    };
  }

  private setBarColors(count: number, color: string) {
    for (let n = 0; n < count; n++) {
      this[`bar${n}`] = color;
    }
  }
}
