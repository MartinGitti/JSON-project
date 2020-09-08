//===============================================TASK 13|1|============================================//
// NOTE: All comments for the relevant code are just above the appropriate code.
// An empty array to store all the objects that are entered by the user.
let art = [];

/* "sessionStorage" function below to store information for as long as browser page is open as well as 
    to see whether or not the page has been loaded before. */
function loadPage() {
    let htmlSelect = document.getElementById("inputInfo");
    // The function will remain hidden and only execute once an object has been created.
    htmlSelect.style.visibility = "hidden";

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("artists", JSON.stringify(art));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        art = JSON.parse(sessionStorage.getItem("artists"));
        let i = 0;
        //Loop through each artist (a) in the "art" array.
        art.forEach(function (a) {
            //For each artist created, the music title is added to the select (dropdown) element. 
            let optItem = document.createElement("option");
            optItem.innerHTML = a.title;
            optItem.value = i;
            i = i + 1;
            htmlSelect.appendChild(optItem);
        });
        //Method below will only allow "select" element to be visible if (1 option is available) or if (i is greater than 0).
        if (i > 0) {
            htmlSelect.style.visibility = "visible";
        }
    }
}

//Below is a constructor function blueprint for each artist object to be created.
function Artist(first, last, year, title, gender, album, genre) {
    this.name = {
        first: first,
        last: last
    };
    this.year = year;
    this.title = title;
    this.gender = gender;
    this.album = album;
    this.genre = genre;
}
// Function to create all new artist objects to the select list once user clicks the create object butto on the HTML page.
function addArtist() {
    art = JSON.parse(sessionStorage.getItem("artists"));
    let newArtist = new Artist(
        document.getElementById("firstName").value,
        document.getElementById("lastName").value,
        document.getElementById("year").value,
        document.getElementById("title").value,
        document.getElementById("gender").value,
        document.getElementById("album").value,
        document.getElementById("genre").value
    );
    // push method used to add each object the the array of artists.
    art.push(newArtist);
    // sessionStorage added to store input information while browser is open/active.
    sessionStorage.setItem("artists", JSON.stringify(art));
}

// When an option in the select list is clicked, an alert with all the relevant details will be displayed.
function ChangeActiveUser(indexOfArtistObj) {
    art[indexOfArtistObj].bio = function () {
        alert(
            this.name.first +
            " " +
            this.name.last +
            " recorded the following music track: " +
            this.title +
            " in the year of " +
            this.year +
            " , the album the music track belonged to was known as: " +
            this.album +
            "." +
            " The music genre of this track is classified as: " +
            this.genre +
            "."
        );
    };
    art[indexOfArtistObj].bio();
}

/* Another output used instead of an alert for each object(option) created.

 All the information added in the input box, will be listed on the HTML page once 
 the "add" button is clicked.
 
 User will also be able to use the "edit" button to edit listed options or to remove options by using the 
 "delete" button. 
 
 With assistance from further reading, I have found this method which works better for the task specifications.*/

// Input text box created.
let inputText = document.getElementById("textBox"),
    items = document.querySelectorAll("#list li"),
    tab = [], index;

// Get the selected li index using an array and populating array with li values.
for (let i = 0; i < items.length; i++) {
    tab.push(items[i].innerHTML);
}

// loop to get li index onclick.
for (let i = 0; i < items.length; i++) {

    items[i].onclick = function () {
        index = tab.indexOf(this.innerHTML);
        console.log(this.innerHTML + " INDEX = " + index);
        inputText.value = this.innerHTML;
    };

}
// Function to clear array.
function refreshArray() {
    tab.length = 0;
    items = document.querySelectorAll("#list li");
    // for loop to fill array.
    for (i = 0; i < items.length; i++) {
        tab.push(items[i].innerHTML);
    }
}
// Function to add object to "select" list.
function addToList() {

    let listNode = document.getElementById("list"),
        textNode = document.createTextNode(inputText.value),
        liNode = document.createElement("LI");

    liNode.appendChild(textNode);
    listNode.appendChild(liNode);

    refreshArray();

    // add an event to the new LI.
    liNode.onclick = function () {
        index = tab.indexOf(liNode.innerHTML);
        console.log(liNode.innerHTML + " INDEX = " + index);
        // Set the selected list value to input text.
        inputText.value = liNode.innerHTML;
    };

}
// Function to edit the selected li value using the input text box.
function editListValue() {
    items[index].innerHTML = inputText.value;
    refreshArray();
}
// Function to remove the selected Li value.
function deleteFromList() {

    refreshArray();
    if (items.length > 0) {
        items[index].parentNode.removeChild(items[index]);
        inputText.value = "";
    }
}
//===============================================THE END============================================//