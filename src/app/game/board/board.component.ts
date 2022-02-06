import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StateService } from '../state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  board = this.stateService.boardSubject.asObservable();
  hint: Observable<boolean> = this.stateService.hintSubject.asObservable();

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
  }

  clickCard(x: number, y: number) {
    this.stateService.checkPiece(x, y);
  }

}
