var api_key = 'AIzaSyDcvOZV7sFO5cTjqq2oUW6M4zTq97aYkQc';
var api_news_Key = '2iMweAEJf8vdocUAi7VUYKZa22C8vOXy';
var url_base_news = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=harryPotter&field-name:("Harry Potter")&api-key=`;

var url_base = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
var url_base_hp = 'https://www.potterapi.com/v1';

var bookslist = []
var newslist = []

var livraria = function() {

    //Ids dos elementos da tela
    var controles = function() {
        return {
            search_books: "search_books",
            booksList: "booksList",
            resultado: "resultado",
            news: "news"
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
        bloco.className = "ocultar";
        div.appendChild(bloco);
        var img = document.createElement('img');
        img.src = book.volumeInfo.imageLinks.thumbnail
        bloco.appendChild(img);
        var h1 = document.createElement('h1');
        h1.innerHTML = book.volumeInfo.title
        bloco.appendChild(h1);
        var p = document.createElement('p');
        p.innerHTML = book.volumeInfo.description
        bloco.appendChild(p);
        var preco = document.createElement('span');
        preco.innerHTML = "R$ " + (Math.floor(Math.random() * (100 - 20)) + 20) + ",00";
        bloco.appendChild(preco);
        var d = document.createElement('button');
        d.className = "btn-menos";
        d.innerHTML = "Saiba menos -"
        d.addEventListener('click', function() { $(this).parent('div').addClass('ocultar'); });
        bloco.appendChild(d);
        var b = document.createElement('button');
        b.className = "btn-saiba";
        b.innerHTML = "Saiba mais +"
        b.addEventListener('click', function() { $(this).parent('div .ocultar').removeClass('ocultar'); });
        bloco.appendChild(b);
        var c = document.createElement('button');
        c.className = "btn-comprar";
        c.innerHTML = "COMPRAR"
        bloco.appendChild(c);


    }
    var list_news = function(news, i) {
        var d = document.getElementById(controles().news);

        var a = document.createElement('div');
        if (i == 0) {
            a.className = "carousel-item active";
        } else {
            a.className = "carousel-item ";
        }
        d.appendChild(a);
        var p = document.createElement('p');
        p.innerHTML = news.abstract;
        p.className = "titulo-noticia";
        a.appendChild(p);
        var l = document.createElement('a');
        l.className = "";
        l.innerHTML = "Saiba mais +"
        a.appendChild(l);
        l.href = news.web_url;
        l.target = "_blank";

    }
    var harry_potter_head = function() {
        var request = url_base_hp + '/sortingHat';
        console.log(request);

        fetch(request)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                document.getElementById(controles().resultado).innerHTML = data;


            }).catch(function(error) {
                console.log('Request failed', error);
            });
    }

    var harry_potter_news = function() {
        var request = url_base_news + api_news_Key;

        console.log(request);

        fetch(request)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                clearList(controles().news);

                newslist = data.response.docs;
                newslist.forEach(list_news);
            }).catch(function(error) {
                console.log('Request failed', error);
            });

    }



    var clearList = function(id_lista) {
        var ul = document.getElementById(id_lista);
        ul.innerHTML = '';
    }

    return {
        search_books: search_books,
        harry_potter_head: harry_potter_head,
        harry_potter_news: harry_potter_news
    };

}();