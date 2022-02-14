import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-add-edit-books',
  templateUrl: './add-edit-books.component.html',
  styleUrls: ['./add-edit-books.component.scss']
})
export class AddEditBooksComponent implements OnInit {

  bookForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    author: new FormControl('')
  });
  isEditMode: boolean = false;
  id!: string;
  book: Book = new Book();

  constructor(private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.bookService.findById(this.id).subscribe(
        (resp: Book) => {
          this.bookForm.patchValue(resp);
          this.book = resp;
        },
        (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      );
    }
  }

  onSubmit(): void {
    this.book.title = this.bookForm.get('title')?.value;
    this.book.author = this.bookForm.get('author')?.value;
    this.bookService.save(this.book).subscribe(
      () => {
        this.isEditMode ?
        this.router.navigate(['../../'], { relativeTo: this.route }) :
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );
  }

}
