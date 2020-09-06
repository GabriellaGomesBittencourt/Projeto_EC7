var api_key = 'AIzaSyDcvOZV7sFO5cTjqq2oUW6M4zTq97aYkQc';
var url_base = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
var bookslist = []

var livraria = function() {


    //Ids dos elementos da tela
    var controles = function() {
        return {
            search_books: "search_books",
            booksList: "booksList"
        };
    }

    var search_books = function() {
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
                // debugger;
                bookslist.forEach(list_books);
            }).catch(function(error) {
                console.log('Request failed', error);
            });

    }

    var list_books = function(book, i) {
        var div = document.getElementById(controles().booksList);
        var bloco = document.createElement('div');
        div.appendChild(bloco);
        var img = document.createElement('img');
        img.src = book.volumeInfo.imageLinks.thumbnail
        bloco.appendChild(img);
        var h1 = document.createElement('h1');
        h1.innerHTML = book.volumeInfo.title
        bloco.appendChild(h1);
        var p = document.createElement('p');
        p.className = "ocultar";
        p.innerHTML = book.volumeInfo.description
        bloco.appendChild(p);
        var b = document.createElement('button');
        b.className = "btn-saiba";
        b.innerHTML = "Saiba mais +"
        bloco.appendChild(b);
        var c = document.createElement('button');
        c.className = "btn-comprar";
        c.innerHTML = "COMPRAR"
        bloco.appendChild(c);


    }

    var clearList = function(id_lista) {
        var ul = document.getElementById(id_lista);
        ul.innerHTML = '';
    }

    return {
        search_books: search_books
    };
}();