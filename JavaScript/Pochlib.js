/* This JavaScript file creates elements
on the loading of the page, which includes
the Add Button, and the Poch'liste which 
is a list of favorite book-cards that are 
stored in the Session Storage.*/

//First, for design, we create an icon tab with the Poch'Lib logo
const headPage      = document.querySelector('head');
const tabIcon       = document.createElement('link');
tabIcon.setAttribute('rel', 'icon');
tabIcon.setAttribute('href', 'img/logo.png');
headPage.appendChild(tabIcon);

/* Then we create a button to add a book when the page loads.
First we create the button and select the element we need */
const addBookButton = document.createElement('button');
//new book
const newBook    = document.querySelector('.h2');
const conteneur     = document.createElement('div');
//new bloc for books
const titlePage    = document.querySelector('h1');
const favoriteBook = document.createElement('section');
const contentBook   = document.getElementById('content');
//list of favorite books
const listFavBook  = document.createElement('ul');

/* Customize the newly created elements */
addBookButton.textContent = 'Rechercher un livre';
addBookButton.className   = "addButton";
addBookButton.id          = "addButton";
conteneur.className       = "newBook";
conteneur.id              = "newBook";
titlePage.id              = "TitleOfPage";
favoriteBook.className    = "favorites";
favoriteBook.id           = "favorite-books";
listFavBook.className     = "FavoriteBooks";

/* LANDING PAGE 
/* Place elements on the page*/
titlePage.after(conteneur);
conteneur.append(newBook);
conteneur.append(addBookButton);
contentBook.after(favoriteBook);
favoriteBook.appendChild(listFavBook);

/* This function creates the list of book-cards 
that are found in the session storage, and display them. */
function CreatingFavorites() {
     /* First check if a book exists in the storage; and get it.*/
    if (sessionStorage.getItem('livre') !== null && sessionStorage.getItem('livre') !== undefined) {
        var livreFavori   = sessionStorage.getItem('livre');
        var livresTrouves = JSON.parse(livreFavori);
        /* For each book in the found books, execute the following :*/
        for (const livre in livresTrouves) {
            /* Create elements for the favorite card */
            const carteFavorite = document.createElement('li');
            const titreFavoris  = document.createElement('h4');
            const autheurFavoris= document.createElement('p');
            const idLivreFavori = document.createElement('h4');
            const descriptionFav= document.createElement('p');
            const imageFavori   = document.createElement('img');
            /* Give these elements properties */
                carteFavorite.className = 'favCard';
                titreFavoris.className  = 'titleFavCard';
                autheurFavoris.className= 'authorFavCard';
                idLivreFavori.className = 'idFavBook';
                descriptionFav.className= 'descFavCard';
                imageFavori.className   = 'imgFavCard';
            
            titreFavoris.innerText   = "Titre : "       + livresTrouves[livre].volumeInfo.title;
            autheurFavoris.innerText = "Auteur : "      + livresTrouves[livre].volumeInfo.authors;
            idLivreFavori.innerText  = "Id: "           + livresTrouves[livre].id;
            descriptionFav.innerText = "Description: "  + livresTrouves[livre].volumeInfo.description;

            /* Add conditions to fit request */
            if (descriptionFav === '' || descriptionFav === 'undefined') {
                descriptionFav.innerText = "Missing info";
            } else if (descriptionFav.innerText.length > 200) {
                descriptionFav.innerText = descriptionFav.innerText.substring(0, 200) + '...';
            }
            if (livresTrouves[livre].volumeInfo.authors.length > 1) {
                livresTrouves[livre].volumeInfo.authors = livresTrouves[livre].volumeInfo.authors.slice(0, 2);
            }

            if (livresTrouves[livre].volumeInfo.imageLinks === null || livresTrouves[livre].volumeInfo.imageLinks === undefined) {
                imageFavori.src = 'img/unavailable.png';
            } else {
                imageFavori.src = livresTrouves[livre].volumeInfo.imageLinks.thumbnail;
            }

            placementCorbeille();
            /* This addEventListener will allow the user
            to delete a favorite card by clicking the bin icon */
            trashIcone.addEventListener('click', (e) => {
                e.preventDefault();
                livresTrouves.splice(livre, 1);
                sessionStorage.setItem('livre', JSON.stringify(livresTrouves));
                location.reload();
                return false;
            })
            /* place elements in the card */
            listFavBook.appendChild(carteFavorite);
            carteFavorite.appendChild(titreFavoris);
            carteFavorite.appendChild(idLivreFavori);
            carteFavorite.appendChild(trashIcone);
            carteFavorite.appendChild(autheurFavoris);
            carteFavorite.appendChild(descriptionFav);
            carteFavorite.appendChild(imageFavori);
}}
    /* create the button & its addeventlistener 
    to delete selected book from the storage.*/
   function placementCorbeille() {
       trashIcone = document.createElement('div');
       trashIcone.className = "deleteIcon";
       trashIcone.innerHTML = '<i class="fas fa-trash-alt"></i>';
       trashIcone.type      = 'delete';
}}
CreatingFavorites();

/* SEARCH WINDOW */
/* This part creates the forms of the search window, 
and buttons to submit form/cancel search. */

/* First, create elements that we need */
const formSearch = document.createElement('form');
const formCancel = document.createElement('form');
const titleBook  = document.createElement('input');
const author     = document.createElement('input');
const section    = document.createElement('section');
const labelTitleofBook = document.createElement('label');
const labelAuthor      = document.createElement('label');
const searchButton     = document.createElement('button');
const cancelButton     = document.createElement('button');
const newSection       = document.createElement('section');
const titreSection2    = document.createElement('div');
const listeLivresRech  = document.createElement('ul');
/* Set class names, properties for elements */
searchButton.innerHTML  = "Rechercher";
cancelButton.innerHTML  = "Annuler";
section.className       = "section";
newSection.className    = "section2";
titreSection2.className = "titreS2";
formSearch.className          = "forma";
formCancel.className          = "forma2";
labelTitleofBook.textContent  = "Titre du livre";
labelTitleofBook.className    = "labeltitle";
labelAuthor.textContent = "Auteur";
labelAuthor.className   = "labelauthor";
searchButton.className  = "searchbtn";
searchButton.type       = "submit";
cancelButton.className  = "cancelbtn";
cancelButton.type       = "cancel";
titleBook.className     = "titre";
titleBook.id            = "idtitle";
author.className        = "author";
author.id               = "idauthor";
listeLivresRech.className = "liste-books";
/* Set the forms */
titleBook.setAttribute('maxlength', "50");
author.setAttribute('maxlength', "50");
/* This function will hide the initial page,
and set elements to place the results of the search. */
function showElement() {
    /* Place and hide some elements*/
    newSection.after(listFavBook);
    addBookButton.style.display = 'none';
    titlePage.after(newBook);
    newBook.after(section);
    /* Place forms and inputs in this section. */
    section.appendChild(formSearch);
        formSearch.appendChild(labelTitleofBook);
        labelTitleofBook.appendChild(titleBook);
        formSearch.appendChild(labelAuthor);
        labelAuthor.appendChild(author);
        formSearch.append(searchButton);
    section.appendChild(formCancel);
        formCancel.appendChild(cancelButton);
}
/* Run the above function on click on the add button */
addBookButton.addEventListener('click', showElement);

function cancelSearch() {
    /* this function hides the searched books,
    the forms & search buttons and displays
    the initial loading page */
    contentBook.style.display   = "initial";
    addBookButton.style.display = "initial";
    listeLivresRech.style.display = "none";
    newSection.style.display    = "none";
    titreSection2.style.display = "none";
}
/* on click on the cancel button, perform above function
that goes back to initial window */
cancelButton.addEventListener('click', cancelSearch);

/*FETCH USE 
This part uses the fetch API on submission of the research form.
This function will fetch the books based on the URL + entries of the user.
It uses the previous function, and also is used by the next one. */
const fetchBook = () => {
    /* Set variables for values from the user's input, and the
    link ot the API containing these values. */
    var titleSearch = titleBook.value;
    var authorSearch = author.value;
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
        + titleSearch
        + '+inauthor:'
        + authorSearch
        + '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg';
    /* The API answer is converted to JSON and for each book,
    the CreatedBook constructor function is called. Finally,
    if an error is met with the API or if the input value isn't found,
    an error is displayed. */
    fetch(url)
        .then(data => data.json())
        .then((librairie) => librairie.items.forEach((livre) => creatingBook(livre)))
        .catch(function (error) { alert(error) });
}
/* this function, when the user submits the form, will display the results.
The forms must not be empty, or an error will be displayed.
If the forms are not empty, a section 2 is created that will contain :
search results as a title, and the results as cards inside an 
unordered HTML list. */
formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    if (author.value == '') {
        alert('Veuillez remplir les deux champs.');
    }
    if (titleBook.value == '') {
        alert('Veuillez remplir les deux champs.');
    }
    else if (titleBook.value !== '' && author.value !== '') {
        document.getElementsByClassName(".favorites");
        document.body.append(newSection);

        newSection.append(titreSection2);
        titreSection2.textContent = 'Résultats de recherche';
        newSection.append(listeLivresRech);
        newSection.after(listFavBook);
        listFavBook.before(contentBook);
        fetchBook();
}})

/* DISPLAY SEARCH RESULTS
This part creates the book-cards of the researched books list. 
It also allows the user to add books to favorites, that will
be displayed on the initial page.
Below function constructor creates a book inside a card;
and displays it in the "Search Results" part of the page.
 */
function creatingBook(livre) {
    /* first, create elements that will be in the card. 
    the card is a LI element of an UL list. */
    const carteLivre       = document.createElement('li');
    const titreCarte       = document.createElement('h4');
    const auteurCarte      = document.createElement('p');
    const idLivre          = document.createElement('h4');
    const descrpitionCarte = document.createElement('p');
    const carteImage       = document.createElement('img');
    /* Then set properties of these elements with 
    help from the JSON response*/
    carteLivre.className        = 'bookCard';
    titreCarte.className        = 'titleCard';
    auteurCarte.className       = 'authorCard';
    idLivre.className           = 'idBook';
    descrpitionCarte.className  = 'descCard';
    carteImage.className        = 'imageCard';

    titreCarte.innerText  = 'Title: '        + livre.volumeInfo.title;
    auteurCarte.innerText = 'Author: '       + livre.volumeInfo.authors;
    idLivre.innerText     = 'Id: '           + livre.id;
    descrpitionCarte.innerText   = 'Description : ' + livre.volumeInfo.description;

    /* Add conditions */
    /* The description must not be longer than 200 characters. 
    If title/author aren't found, a message is displayed.
    Only two authors max are to be displayed in the card. */
        if (descrpitionCarte === '' || descrpitionCarte === 'undefined') {
            descrpitionCarte.innerText = "Information manquante";
        } else if (descrpitionCarte.innerText.length > 200) {
            descrpitionCarte.innerText = descrpitionCarte.innerText.substring(0, 200) + '...';
        }
        if (livre.volumeInfo.authors.length > 1) {
            livre.volumeInfo.authors = livre.volumeInfo.authors.slice(0, 2);
        }
        if (livre.volumeInfo.imageLinks === null || livre.volumeInfo.imageLinks === undefined) {
            carteImage.src = 'img/unavailable.png';
        } else {
            carteImage.src = livre.volumeInfo.imageLinks.thumbnail;
        }

        favoritePlacement();
        /* On click on the icon "favorites",
        if book already exists in the storage, an alert shows on.
        if book doesn't exist in the storage, add it to array.
        The selected book is pushed to the array.  */
        divFavIcon.addEventListener('click', (e) => {
        e.preventDefault();
        let books = [];
        if ((sessionStorage.getItem('livre') !== null) && (sessionStorage.getItem('livre') !== undefined)) {
            books = JSON.parse(sessionStorage.getItem('livre'));
        }
        if (books.some(b => b.id === livre.id)) {
            alert('Ce livre est déjà présent dans vos favoris.');
        } else {
            books.push(livre);
            sessionStorage.setItem('livre', JSON.stringify(books));
        }
    })
    /* Dispose elements inside the card */
    listeLivresRech.appendChild(carteLivre);
    carteLivre.append(titreCarte);
    carteLivre.append(divFavIcon);
    carteLivre.append(idLivre);
    carteLivre.append(auteurCarte);
    carteLivre.append(descrpitionCarte);
    carteLivre.append(carteImage);
}
    /* Create favorite icon that will show */
function favoritePlacement() {
    divFavIcon           = document.createElement('div');
    divFavIcon.className = "favoriteIcon";
    divFavIcon.innerHTML = '<i class="fas fa-bookmark"></i>';
    divFavIcon.type      = "save";
}