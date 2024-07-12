import { regexPatterns } from "./regexPatterns"; 
export class PasswordStrengthService {
    private colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];
  
    checkStrength(password: string): number {
      let force = 0;
      const lowerLetters = regexPatterns.lowerLetters.test(password);
      const upperLetters = regexPatterns.upperLetters.test(password);
      const numbers = regexPatterns.numbers.test(password);
      const symbols = regexPatterns.symbols.test(password);
  
      const passedMatches = [lowerLetters, upperLetters, numbers, symbols].reduce((acc, flag) => acc + (flag ? 1 : 0), 0);
      return;
    }
  }