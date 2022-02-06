import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  timer = this.stateService.timerSubject.asObservable();
  winner = this.stateService.winnerSubject.asObservable();
  rows = this.stateService.root || 0;

  constructor(
    private stateService: StateService
  ) { }

  toggleHint() {
    this.stateService.toggleHint();
  }

  restart() {
    this.stateService.restart();
  }

}
