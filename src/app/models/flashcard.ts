import { Book } from "./book";
import { Module } from "./module";
import { Topic } from "./topic";

export class Flashcard {
    id!: string;
    title!: string;
    question!: string;
    answer!: string;
    module!: Module
    book!: Book;
    pageOfBook!: string;
    topic!: Topic;
    enabled: boolean = true;

    createdAt!: Date;
    createdBy!: string;
	lastUpdateAt!: Date;
	lastUpdateBy!: string;
}
