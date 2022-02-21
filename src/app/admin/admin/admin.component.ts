import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';

 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookList: Array<Book> = [];
  selectedBook: Book = new Book();
  errorMessage: string = ""

  //take refference to BookComponent, in order to call its functions from here
  @ViewChild(BookComponent) childBook: BookComponent | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }

  createBookRequest() {
    this.selectedBook = new Book();
    this.childBook?.showBookModal();
  }

  editBookRequest(item: Book) {
    //we take a copy copy of selected item, s.t. to not modify it by editing and make it dirty
    this.selectedBook = Object.assign({}, item);
    this.childBook?.showBookModal();
  }

  // bec the child sents event with data as Book, we take input directly as Book
  saveEventBookWatcher(book: Book){
    let itemIndex = this.bookList.findIndex(item => item.id === book.id);
    if(itemIndex !== -1){
      this.bookList[itemIndex] = book;   //if has an index, edit it
    }else{
    this.bookList.push(book); //update list with new created book, recv from child Book
    }
  }


  deleteBook(item: Book, index: number){
    //we send book to delete, and subscribe to see if success
    //if success, i remove book at that index from the list
    this.bookService.deleteBook(item).subscribe(data => {
      this.bookList.splice(index, 1); 
    }, err => { this.errorMessage = 'Unexpected error occurred while deleting.'; console.log(err) })
  }

}
