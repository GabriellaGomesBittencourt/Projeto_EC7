
var api_key = 'AIzaSyDcvOZV7sFO5cTjqq2oUW6M4zTq97aYkQc';
var url_base = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
var bookslist =[]

var livraria = function () {


    //Ids dos elementos da tela
    var controles = function () {
        return {
            search_books: "search_books",
            booksList: "booksList"
        };
    }

    var search_books = function(){
        var content = document.getElementById(controles().search_books).value;
        var request = url_base + content + '&filter=partial&projection=lite&key=' + api_key; 

        console.log(request);

        fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) { 
            clearList(controles().booksList);                     
            bookslist = data.items;          
            bookslist.forEach(list_books);            
        }).catch(function(error){
            console.log('Request failed',error);            
        });

    }

    var list_books = function(book,i){
        var ul = document.getElementById(controles().booksList);
        var li = document.createElement('li');
        li.innerHTML = book.volumeInfo.title
        ul.appendChild(li);  
    }

    var clearList = function(id_lista){
        var ul = document.getElementById(id_lista);
         ul.innerHTML = '';
    }
 
    return {
        search_books: search_books
    };
}();