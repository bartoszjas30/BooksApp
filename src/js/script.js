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

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  }; //tutaj znajduję szablon
  const filters = [];
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
        if(!favoriteBooks.includes(bookId)){
          //jeśli nie ma to dodaje to tablicy to id

          favoriteBooks.push(bookId);
          //i dodaje klasę favorite
          event.target.offsetParent.classList.add('favorite');

          //console.log('dodaje', favoriteBooks);

          //jeśli juz mamy takie id w tablicy favoriteBooks
        }else {
          //przypisze identyfikator
          const index = favoriteBooks.indexOf(bookId);

          //usunie go z tablicy
          favoriteBooks.splice(index, 1);
          //usunie klasę favorite z elementu
          event.target.offsetParent.classList.remove('favorite');
          //console.log('zdejmuje', favoriteBooks);

        }



      })
    }



    const formular = document.querySelector(select.containerOf.filters);

    formular.addEventListener('click', function(callback){

      if(callback.target.type == 'checkbox' && callback.target.tagName == 'INPUT' && callback.target.name == 'filter'){
        const value = callback.target.value;
        console.log('value', value);
        if(callback.target.checked){
        filters.push(value);
        }else {
          filters.splice(filters.indexOf(value), 1);
        }
      }
      filterBooks(callback);
    });

  }

  function filterBooks(){

    for(let book of dataSource.books){
      let shouldBeHidden = false
      const bookId = book.id;
      const selected = document.querySelector(select.containerOf.bookImage + '[data-id = "' + bookId + '"]');


      for(const filter of filters){
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

  render();
  initActions();
}
