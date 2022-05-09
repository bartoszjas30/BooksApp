{
  'use strict';

  const select = {                      //tworzę referencję do #template-book
    templateOf: {
      books: '#template-book',
    },

    containerOf: {                      //tworzę referencję do .books-list
      booksList: '.books-list',
      bookImage: '.book__image',
    },
  };

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }; //tutaj znajduję szablon

  const render = function(){
    for (let book of dataSource.books){

      /* generate HTML based on template */

      const generatedHTML = template.book(book);

      /* generated DOM */

      const bookElement = utils.createDOMFromHTML(generatedHTML);

      /* Find container of booksList */

      const bookList = document.querySelector(select.containerOf.booksList);

      /* Add books to the booksList */

      bookList.appendChild(bookElement);
    }
  };


  render();
}
