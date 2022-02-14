import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Flashcard } from 'src/app/models/flashcard';
import { Module } from 'src/app/models/module';
import { Topic } from 'src/app/models/topic';
import { BookService } from 'src/app/services/book/book.service';
import { FlashcardService } from 'src/app/services/flashcard/flashcard.service';
import { ModuleService } from 'src/app/services/module/module.service';
import { TopicService } from 'src/app/services/topic/topic.service';
import tinymce from 'tinymce';

@Component({
  selector: 'app-add-edit-flashcards',
  templateUrl: './add-edit-flashcards.component.html',
  styleUrls: ['./add-edit-flashcards.component.scss']
})
export class AddEditFlashcardsComponent implements OnInit, OnDestroy {

  flashcardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    module: new FormGroup({
      id: new FormControl('' , Validators.required)
    }),
    book: new FormGroup({
      id: new FormControl('', Validators.required),
    }),
    pageOfBook: new FormControl(''),
    topic: new FormGroup({
      id: new FormControl('', Validators.required),
    }), 
    question: new FormControl('Ingresá aquí el contenido del frente de la tarjeta.' , [
      Validators.required,
      this.invalidBodyFlashcard()
    ]),
    answer: new FormControl('Ingresá aquí el contenido del dorso de la tarjeta.', [
      Validators.required,
      this.invalidBodyFlashcard()
    ])
  });
  isEditMode: boolean = false;
  id!: string;
  flashcard: Flashcard = new Flashcard();
  modules!: Module[];
  books!: Book[];
  topics!: Topic[];

  constructor(private moduleService: ModuleService,
    private bookService: BookService,
    private topicService: TopicService,
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router) {
      this.moduleService.findAllEnabled().subscribe(
        (resp: Module[]) => this.modules = resp
      );
      this.bookService.findAllEnabled().subscribe(
        (resp: Book[]) => this.books = resp
      );
      this.topicService.findAllEnabled().subscribe(
        (resp: Topic[]) => this.topics = resp
      )
  }

  ngOnDestroy(): void {
    tinymce.remove();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.flashcardService.findById(this.id).subscribe(
        (resp: Flashcard) => {
          this.flashcardForm.patchValue(resp);
          this.flashcardForm.get('module.id')?.setValue(resp.module.id);
          this.flashcardForm.get('book.id')?.setValue(resp.book.id);
          this.flashcardForm.get('topic.id')?.setValue(resp.topic.id);
          this.flashcard = resp;
       },
        (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      );
    }

  }

  onSubmit(): void {
    this.flashcard = JSON.parse(JSON.stringify(this.flashcardForm.value));
    this.flashcard.id = this.id;
    this.flashcardService.save(this.flashcard).subscribe(
      () => {
        this.isEditMode ?
        this.router.navigate(['../../'], { relativeTo: this.route }) :
        this.router.navigate(['../'], { relativeTo: this.route });
      })
  }

  invalidBodyFlashcard(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == '<p>Ingres&aacute; aqu&iacute; el contenido del frente de la tarjeta.</p>' ||
      control.value == '<p>Ingres&aacute; aqu&iacute; el contenido del dorso de la tarjeta.</p>') {
        return {invalidBodyFlashcard: true};
      }
      return null;
    }
  }
  
}
