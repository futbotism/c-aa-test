import { Injectable } from '@angular/core';
import randomColor from 'randomcolor';
import { BehaviorSubject } from 'rxjs';

export interface Piece {
  checked: boolean;
  found: boolean;
  color: string;
  turns: number;
}

export interface Guess {
  x: number;
  y: number;
}

export interface Winner {
  winner: boolean;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public root = 6;
  private time: number = 0;
  private interval: any;
  private showHint = false;
  private prevGuess?: Guess;
  private board: Piece[][] = this.initPieces();

  public boardSubject = new BehaviorSubject<Piece[][]>(this.board);
  public hintSubject = new BehaviorSubject<boolean>(this.showHint);
  public timerSubject = new BehaviorSubject<number>(0);
  public winnerSubject = new BehaviorSubject<Winner>({
    winner: false,
    score: 0,
  });

  constructor() {
    this.startTimer();
  }

  restart() {
    this.board = this.initPieces();
    this.boardSubject.next(this.board);
    this.time = 0;
    this.startTimer();
    this.winnerSubject.next({
      score: 0,
      winner: false,
    });
  }

  startTimer() {
    this.interval = setInterval(() => this.increaseTime(1), 1000);
  }

  increaseTime(increment: number = 1) {
    this.time += increment;
    this.timerSubject.next(this.time);
  }

  toggleHint() {
    this.showHint = !this.showHint;
    this.hintSubject.next(this.showHint);
  }

  initPieces(root: number = 6) {
    // create set of random colors half length of game cards
    const colorSet: string[] = this.getColorSet(root);
    // double and duplicate the color set
    const colors = [...colorSet, ...colorSet];

    return Array(root)
      .fill(0)
      .map(() =>
        Array(root)
          .fill(0)
          .map(() => ({
            checked: false,
            found: false,
            color: colors.pop() as string,
            turns: 0,
          }))
      );
  }

  getColorSet(root: number) {
    return Array((root * root) / 2)
      .fill(0)
      .map(() =>
        randomColor({
          luminosity: 'bright',
          hue: 'random',
        })
      );
  }

  checkPiece(x: number, y: number) {
    this.lookup({ x, y }).turns++;
    this.turnCard({ x, y });

    if (this.prevGuess) {
      if (this.compare(this.prevGuess, { x, y })) {
        this.assertMatch({ x, y });
        return;
      } else {
        setTimeout(() => {
          this.turnCard({ x, y });
          this.resetBoard();
        }, 1000);
      }
    } else {
      this.prevGuess = { x, y };
    }
    setTimeout(() => {
      if (this.lookup({ x, y }).turns > 2) {
        this.increaseTime(5);
      }
    }, 1000);
  }

  assertMatch(guess: Guess) {
    this.lookup(guess).found = true;
    this.lookup(this.prevGuess!).found = true;

    this.prevGuess = undefined;

    if (this.board.every((row) => row.every((cell) => cell.found))) {
      this.winnerSubject.next({
        score: this.time,
        winner: true,
      });
      this.timerSubject.next(0);
      clearInterval(this.interval);
    }
  }

  compare(a: Guess, b: Guess) {
    return this.lookup(a).color === this.lookup(b).color;
  }

  lookup({ x, y }: Guess) {
    return this.board[x][y];
  }

  resetBoard() {
    this.turnCard(this.prevGuess!);
    this.prevGuess = undefined;
  }

  turnCard({ x, y }: Guess) {
    this.board[x][y].checked = !this.board[x][y].checked;
    this.boardSubject.next(this.board);
  }
}
