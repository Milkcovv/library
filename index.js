
	const $library = document.querySelector('.book-list')
	const $addBookBtn = document.querySelector('.add-book')
	const $title = document.querySelector('.book-form').elements['title'];
	const $author = document.querySelector('.book-form').elements['author'];
	const $pages = document.querySelector('.book-form').elements['pages'];
	const $read = document.querySelectorAll('input[name="read"]');
	// let $bookInfo = document.querySelectorAll('.book-info')
	const $bookList = document.querySelector('.book-list')
	const $bookForm = document.querySelector('.book-form');
	const $formToggle = document.querySelector('.book-form-toggle')
	const $wrapper = document.querySelector('.wrapper')
	const $hideForm = document.querySelector('.hide-form');


//show myLibrary on page loaded up
window.addEventListener('DOMContentLoaded', displayLibrary)

function toggleForm(e){
	if($bookForm.style.visibility === 'visible'){
		$bookForm.style.visibility = 'hidden';
		$wrapper.style.filter = 'blur(0px)';
		e.preventDefault();
	}else{
		$bookForm.style.visibility = 'visible';
		$wrapper.style.filter = 'blur(8px)';
		e.preventDefault();
	}
		

}

$formToggle.addEventListener('click',toggleForm)
$hideForm.addEventListener('click',toggleForm)



let myLibrary = [
{
	title:'Hello world',
	author: 'me',
	pages: 25,
	read: false
},

{
	title:'Earth to moon',
	author: 'you',
	pages: 35,
	read: false
},

{
	title:'you are the one ',
	author: 'you',
	pages: 45,
	read: true
},


];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


function clearForm() {
	$title.value = ""
	$author.value = ""
	$pages.value = ""
}

function getReadStatus(){
		for (const r of $read){
			if(r.checked){
				return true
			}else{
				return false
			}
		}
	
}



//Add a book to the array
function addBookToLibrary(e) {
	e.preventDefault();

	if($title.value == '' || $author.value =='' || $pages.value == '' ){
		alert('please input');

	}else{
		const newTitle = $title.value;
		const newAuthor = $author.value;
		const newPages = $pages.value;
		const newRead = getReadStatus();
		const newBook = new Book(newTitle,newAuthor,newPages,newRead);
		myLibrary.push(newBook)
		clearForm();
		displayLibrary();
		toggleForm();
	}

	
}

//remove book
function removeBookFromLibrary(e){
	if(e.target.attributes['data-index']){
		const index = e.target.attributes['data-index'].value
		// const index = this.getAttribute('data-index');
		myLibrary.splice(index,1);
		displayLibrary();
	}

}




function displayLibrary() {
	$library.innerHTML = '';
	myLibrary.forEach((book,index) => {
		const $book = document.createElement('div');
		const $removeBtn = document.createElement('span');
		$book.className += 'book-info';
		$removeBtn.setAttribute('data-index', index)
		$removeBtn.className += 'remove-icon';
		$removeBtn.textContent ='x'
		for(const prop in book){
			if(prop == 'read'){
				if (book[prop]){
					$book.innerHTML +=`<p>read</p>`;

				}
				else{
					$book.innerHTML +=`<p>not read</p>`;
				}
				
			}else{
				$book.innerHTML +=`<p>${book[prop]}</p>`;
			}
		}
		$book.appendChild($removeBtn)
		$library.appendChild($book);
	})

	
}





$addBookBtn.addEventListener('click', addBookToLibrary);


$bookList.addEventListener('click', removeBookFromLibrary)

