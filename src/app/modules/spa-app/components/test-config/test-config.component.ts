import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Module } from 'src/app/models/module';
import { BookService } from 'src/app/services/book/book.service';
import { ModuleService } from 'src/app/services/module/module.service';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit {

  selectionTestSizeDefaultText: string = "Elegí la cantidad de tarjetas";

  listOfBooks: Book[] = [];
  listOfModules: Module[] = [];

  groupActive!: string; // Indica si esta seleccionado MODULO o BIBLIOGRAFIA
  listActive: string[] = [];
  itemListActive: number = 0;

  testSize: number = 5;  // Indica el tamaño de test seleccionado
  testSearch!: string;

  constructor(
    private moduleService: ModuleService,
    private bookService: BookService,
    private testService: TestService,
    private router: Router
    ) {
    this.bookService.findAllEnabled().subscribe(
      (resp: Book[]) => this.listOfBooks = resp
    );
    this.moduleService.findAll().subscribe(
      (resp: Module[]) => {
        resp.forEach((module: Module) => {
          if (module.enabled == true) {
            this.listOfModules.push(module);
          }
        });
        this.selectGroup('module');
      }
    );
  }

  ngOnInit(): void {
  }

  selectGroup(group: string): void {
    this.groupActive = group;
    this.listActive = [];
    this.itemListActive = 0;
    switch (group) {
      case 'module': {
        for(var mod of this.listOfModules) {
          this.listActive.push(mod.module);
        }
        break;
      }
      case 'bibliography': {
        for (var book of this.listOfBooks) {
          this.listActive.push(book.title);
        }
        break;
      }
    }
  }

  selectItemList(index: number): void {
    this.itemListActive = index;
  }

  runFlashcards(): void {
    switch (this.groupActive) {
      case 'module': {
        for(var mod of this.listOfModules) {
          if (mod.module == this.listActive[this.itemListActive]) {
            this.testSearch = mod.id;
            break;
          }
        }
        break;
      }
      case 'bibliography': {
        for (var book of this.listOfBooks) {
          if (book.title == this.listActive[this.itemListActive]) {
            this.testSearch = book.id;
            break;
          }
        }
        break;
      }
    }
    this.testService.save(this.groupActive, this.testSearch, this.testSize).subscribe(
      (resp) => console.log(resp)
    );
    console.log(this.testSearch);
//    this.router.navigateByUrl('/app/run-flashcard');
  }

}