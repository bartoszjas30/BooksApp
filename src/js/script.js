{
  'use strict';

  const select = {                      //tworzę referencję do #template-book
    templateOf: {
      books: '#template-book',
    },

    containerOf: {                      //tworzę referencję do .books-list
      booksList: '.books-list',
      bookImage: '.book__image',
      bookImageId: '#data-id',
    },
  };

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }; //tutaj znajduję szablon

  const render = function(){
    for (let book of dataSource.books){       //tworzę pętle for let, aby przejść po elementach

      /* generate HTML based on template */

      const generatedHTML = template.book(book);      //generuję HTML

      /* generated DOM */

      const bookElement = utils.createDOMFromHTML(generatedHTML);

      /* Find container of booksList */

      const bookList = document.querySelector(select.containerOf.booksList);

      /* Add books to the booksList */

      bookList.appendChild(bookElement);
    }
  };

  const favoriteBooks = [];

  function initActions(){

    const elementsOfBooks = document.querySelectorAll(select.containerOf.bookImage);

    for(let elementBook of elementsOfBooks){
      elementBook.addEventListener('dblclick', function(event){
        event.preventDefault;

        const bookId = elementBook.getAttribute(select.containerOf.bookImageId);
        let index = favoriteBooks.indexOf(bookId);
        if(index == -1){
          elementBook.classList.add('favorite');
          favoriteBooks.push(bookId);
        }else {
          elementBook.classList.remove('favorite');
          favoriteBooks.splice(index, 1);

        }



      });
    }

  }

  render();
  initActions(favoriteBooks);
}
