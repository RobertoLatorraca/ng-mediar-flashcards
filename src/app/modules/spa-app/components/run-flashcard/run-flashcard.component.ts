import { Component, OnInit } from '@angular/core';

export type FlashcardSide = 'front' | 'back';

@Component({
  selector: 'app-run-flashcard',
  templateUrl: './run-flashcard.component.html',
  styleUrls: ['./run-flashcard.component.scss']
})
export class RunFlashcardComponent implements OnInit {

  side: FlashcardSide = 'front';

  constructor() { }

  ngOnInit(): void {
  }

  toggleSide(): void {
    if (this.side == 'front') {
      this.side = 'back';
    } else {
      this.side = 'front';
    }
  }

  get showFrontFlashcard(): boolean {
    return this.side == 'front';
  }

  get showBackFlashcard(): boolean {
    return this.side == 'back';
  }

}
