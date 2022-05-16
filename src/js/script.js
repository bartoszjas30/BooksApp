/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
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
      filters: '.filters',
    },
  };
  const allBooks = dataSource.books;
  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }; //tutaj znajduję szablon

  class BooksList{

    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();

    }

    initData(){
      const thisBooksList = this;
      this.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.dom = {};
      thisBooksList.dom.bookLists = document.querySelector(select.containerOf.booksList);
      thisBooksList.dom.filters = document.querySelector(select.containerOf.filters);
    }

    render(){
      const thisBooksList = this;

      for (let book of allBooks){       //tworzę pętle for let, aby przejść po elementach




        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;
        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;

        /* generate HTML based on template */

        const generatedHTML = template.book(book);      //generuję HTML

        /* generated DOM */

        const bookElement = utils.createDOMFromHTML(generatedHTML);

        /* Find container of booksList */
        const booksList = document.querySelector(select.containerOf.booksList);




        /* Add books to the booksList */

        booksList.appendChild(bookElement);


      }
    }

    initActions(){

      const thisBooksList = this;
      //dodaję referencję do elementów - obrazków i listy ksiązek
      const elementsOfBooks = document.querySelectorAll(select.containerOf.bookImage);

      //przechodzę po wszystkich elementach
      for(let elementBook of elementsOfBooks){
        //dodaję addEventListener db który uruchomi funkcję
        elementBook.addEventListener('dblclick', function(event){
          //funkcja zatrzymuje zachowanie przeglądarki
          event.preventDefault;

          //pobiera id klikniętego elementu z data-id
          const bookId = event.target.offsetParent.getAttribute('data-id');
          //sprawdzi czy w tablicy favoritBooks jest juz to id
          if(!thisBooksList.favoriteBooks.includes(bookId)){
            //jeśli nie ma to dodaje to tablicy to id

            thisBooksList.favoriteBooks.push(bookId);
            //i dodaje klasę favorite
            event.target.offsetParent.classList.add('favorite');

            //console.log('dodaje', favoriteBooks);

            //jeśli juz mamy takie id w tablicy favoriteBooks
          }else {
            //przypisze identyfikator
            const index = thisBooksList.favoriteBooks.indexOf(bookId);

            //usunie go z tablicy
            thisBooksList.favoriteBooks.splice(index, 1);
            //usunie klasę favorite z elementu
            event.target.offsetParent.classList.remove('favorite');
            //console.log('zdejmuje', favoriteBooks);

          }



        });
      }



      const formular = document.querySelector(select.containerOf.filters);

      formular.addEventListener('click', function(callback){

        if(callback.target.type == 'checkbox' && callback.target.tagName == 'INPUT' && callback.target.name == 'filter'){
          const value = callback.target.value;
          console.log('value', value);
          if(callback.target.checked){
            thisBooksList.filters.push(value);
          }else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(value), 1);
          }
        }
        thisBooksList.filterBooks(callback);
      });

    }

    filterBooks(){
      const thisBooksList = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;
        const bookId = book.id;
        const selected = document.querySelector(select.containerOf.bookImage + '[data-id = "' + bookId + '"]');


        for(const filter of thisBooksList.filters){
          if (!book.details[filter] == true){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden === true){
          selected.classList.add('hidden');
        } else {
          selected.classList.remove('hidden');
        }
      }

    }

    determineRatingBgc(rating){

      let ratingStyle = '';

      if(rating < 6){
        ratingStyle = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        ratingStyle = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        ratingStyle = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        ratingStyle = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingStyle;
    }

    //render();
    //initActions();





  }


  new BooksList();



}
