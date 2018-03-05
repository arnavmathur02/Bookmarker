//listen for form Submit
document.getElementById('myform').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  // Save Bokkmarks
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateform(siteName,siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // local storage Test
  // localStorage.setItem('test','Hello World');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'))

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks')=== null){
    // Init Array
    var bookmarks = [];
    // Add to Array
    bookmarks.push(bookmark);

    // Set to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }

  else {
    //Get bookmarks frm localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to Array
    bookmarks.push(bookmark);

    // Reset back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  }

  // Cleaar or reset the form
  document.getElementById('myform').reset();

  fetchbookmarks();
  //Prevents form from Submitting
  e.preventDefault();
}


  function deletebookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
      if(bookmarks[i].url ==url){
        bookmarks.splice(i,1);
      }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchbookmarks();
  }

// Save bookmarks
function fetchbookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults= document.getElementById('bookmarksResults');

  // build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well"> '+
                                  '<h3>'+name+
                                  '<a class="btn btn-default" target="_blank" href=" '+url+' ">Visit</a>' +
                                  '<a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>'
  }
}

function validateform(siteName,siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill  in the form');
    return false;
  }

  var expression = /[-a-zA-z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid url');
    return false;
  }
  return true;
}
