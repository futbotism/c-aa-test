import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
