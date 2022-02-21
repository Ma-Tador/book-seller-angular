import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/services/book.service';


//we need to jquery to access the Modal of book
declare var $: any;


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input()
  book: Book = new Book();

  errorMessage: string = "";
  
  @Output()
  saveEventEmitter: EventEmitter<any> = new EventEmitter();  //we emit event from child Book to parent Admin

  constructor(private bookService: BookService) { }

  saveBook(){
    this.bookService.saveBook(this.book).subscribe(data => {
      this.saveEventEmitter.emit(data); //send data to parent Admin, to update the list w the new added Book
      $('#bookModal').modal('hide');
    }, err => { this.errorMessage = err; console.log(err)})
  }

  showBookModal(){
    $('#bookModal').modal('show'); //to show the bookModal, we get via jQuery the elem by id
  }

}
