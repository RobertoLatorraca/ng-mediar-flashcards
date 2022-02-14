import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flashcard } from 'src/app/models/flashcard';
import { FlashcardService } from 'src/app/services/flashcard/flashcard.service';

@Component({
  selector: 'app-list-flashcards',
  templateUrl: './list-flashcards.component.html',
  styleUrls: ['./list-flashcards.component.scss']
})
export class ListFlashcardsComponent implements OnInit {

  flashcards!: Flashcard[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData(): void {
    this.flashcardService.findAll().subscribe(
      (resp: Flashcard[]) => this.flashcards = resp
    );
  }

  addFlashcard(): void {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  editFlashcard(flashcard: Flashcard): void {
    this.router.navigate(['./edit', flashcard.id], { relativeTo: this.route })
  }

  toggleFlashcardEnabled(flashcard: Flashcard): void {
    let clone: Flashcard = JSON.parse(JSON.stringify(flashcard));
    clone.enabled = !flashcard.enabled;
    this.flashcardService.save(clone).subscribe(
      () => this.loadTableData()
    );
  }

}
