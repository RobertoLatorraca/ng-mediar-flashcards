import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {

  books!: Book[];

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData(): void {
    this.bookService.findAll().subscribe(
      (resp: Book[]) => this.books = resp
    );
  }

  addBook(): void {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  editBook(book: Book): void {
    this.router.navigate(['./edit', book.id], { relativeTo: this.route })
  }

  toggleBookEnabled(book: Book): void {
    let clone: Book = JSON.parse(JSON.stringify(book));
    clone.enabled = !book.enabled;
    this.bookService.save(clone).subscribe(
      () => this.loadTableData()
    );
  }

}
