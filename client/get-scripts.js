/* *************************
 *** DISPLAY BY USER ***
 ************************** */
function displayMine() { 
    console.log('displayMine Function Called');
    const accessToken = localStorage.getItem("SessionToken");

    fetch(`http://localhost:3000/journal/mine`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //refers to div with id of journals
            let display = document.getElementById('journals');
            //for loop checks if thera are any elements in div and removes them
            //before displaying more 
            for (i = 0; i = display.childNodes.length; i++) {
                display.removeChild(display.firstChild)
            }
            //checks if the obj is empty and thus there are no posts and gives a response to user 
            //that there are no posts yet
            if (data.length === 0) {
                let display = document.getElementById('journals');
                let header = document.createElement('h5');

                display.appendChild(header);
                header.textContent = "You haven't made any posts yet";
                //gve the header a class 
                header.setAttribute("class", "noPosts")
            } else {
                //display content if it exists in else statment
                for (i = 0; i < data.length; i++) {

                    //set up vars
                    let display = document.getElementById("journals");
                    let card = document.createElement("div");
                    let body = document.createElement("div");
                    let header = document.createElement("h5");
                    let subtitle = document.createElement("h6");
                    let para = document.createElement("p");
                    let editBtn = document.createElement("button");
                    let deleteBtn = document.createElement("button");
                    //retrieve current vals via vars referring to loop index elements
                    let current = data[i];
                    let title = current.title;
                    let date = current.date;
                    let entry = current.entry;

                    //fill the elements and divs 

                    header.textContent = title;
                    subtitle.textContent = date;
                    para.textContent = entry;
                    editBtn.innerHTML = "Edit";
                    deleteBtn.innerHTML = "Delete";

                    //APPEND ALL ELEMENTS TO THE DOM TREE
                    display.appendChild(card);
                    card.appendChild(body);
                    body.appendChild(header);
                    body.appendChild(subtitle);
                    body.appendChild(para);
                    body.appendChild(editBtn);
                    body.appendChild(deleteBtn);

                    card.setAttribute("id", current.id);
                    card.setAttribute("class", "card");
                    body.setAttribute("class", "card-body");
                    header.setAttribute("class", "card-title");
                    subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
                    para.setAttribute("class", "card-text");

                    editBtn.setAttribute("class", "btn btn-dark editBtn");
                    editBtn.setAttribute("type", "button");
                    editBtn.setAttribute("onclick", `editJournal(${current.id})`);

                    deleteBtn.setAttribute("class", "btn btn-dark deleteBtn");
                    deleteBtn.setAttribute("type", "button");
                    deleteBtn.setAttribute("onclick", `deleteJournal(${current.id})`);
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
}


/* *************************
 *** DISPLAY ALL ***
 ************************** */
function displayAll() { 
    console.log('displayAll Function Called')


    fetch(`http://localhost:3000/journal/`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                //no authorization token needed 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //refers to div with id of journals
            let display = document.getElementById('journals');
            //for loop checks if thera are any elements in div and removes them
            //before displaying more 
            for (i = 0; i = display.childNodes.length; i++) {
                display.removeChild(display.firstChild)
            }
            //checks if the obj is empty and thus there are no posts and gives a response to user 
            //that there are no posts yet
            if (data.length === 0) {
                let display = document.getElementById('journals');
                let header = document.createElement('h5');

                display.appendChild(header);
                header.textContent = "No posts have been made yet";
                //gve the header a class 
                header.setAttribute("class", "noPosts")
            } else {
                //display content if it exists in else statment
                for (i = 0; i < data.length; i++) {

                    //set up vars
                    let display = document.getElementById("journals");
                    let card = document.createElement("div");
                    let body = document.createElement("div");
                    let header = document.createElement("h5");
                    let subtitle = document.createElement("h6");
                    let para = document.createElement("p");

                    //retrieve current vals via vars referring to loop index elements
                    let current = data[i];
                    let title = current.title;
                    let date = current.date;
                    let entry = current.entry;

                    //fill the elements and divs 

                    header.textContent = title;
                    subtitle.textContent = date;
                    para.textContent = entry;


                    //APPEND ALL ELEMENTS TO THE DOM TREE
                    display.appendChild(card);
                    card.appendChild(body);
                    body.appendChild(header);
                    body.appendChild(subtitle);
                    body.appendChild(para);


                    card.setAttribute("id", current.id);
                    card.setAttribute("class", "card");
                    body.setAttribute("class", "card-body");
                    header.setAttribute("class", "card-title");
                    subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
                    para.setAttribute("class", "card-text");
                }

            }
        })
        .catch(err => {
            console.error(err)
        })

}


/* *************************
 *** DISPLAY BY TITLE ***
 ************************** */
function displayByTitle() { 
    console.log('displayByTitle Function Called')
    let searchTitle = document.getElementById("searchBar").value;
    console.log(searchTitle);
    fetch(`http://localhost:3000/journal/${searchTitle}`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                //no authorization token needed 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //refers to div with id of journals

            let display = document.getElementById('journals');
            //for loop checks if thera are any elements in div and removes them
            //before displaying more 
            for (i = 0; i = display.childNodes.length; i++) {
                display.removeChild(display.firstChild)
            }
            //checks if the obj is empty and thus there are no posts and gives a response to user 
            //that there are no posts yet
            if (data.length === 0) {
                let display = document.getElementById('journals');
                let header = document.createElement('h5');

                display.appendChild(header);
                header.textContent = "No posts have been made yet";
                //gve the header a class 
                header.setAttribute("class", "noPosts")
            } else {
                //display content if it exists in else statment
                for (i = 0; i < data.length; i++) {

                    //set up vars
                    let display = document.getElementById("journals");
                    let card = document.createElement("div");
                    let body = document.createElement("div");
                    let header = document.createElement("h5");
                    let subtitle = document.createElement("h6");
                    let para = document.createElement("p");

                    //retrieve current vals via vars referring to loop index elements
                    let current = data[i];
                    let title = current.title;
                    let date = current.date;
                    let entry = current.entry;

                    //fill the elements and divs 

                    header.textContent = title;
                    subtitle.textContent = date;
                    para.textContent = entry;


                    //APPEND ALL ELEMENTS TO THE DOM TREE
                    display.appendChild(card);
                    card.appendChild(body);
                    body.appendChild(header);
                    body.appendChild(subtitle);
                    body.appendChild(para);


                    card.setAttribute("id", current.id);
                    card.setAttribute("class", "card");
                    body.setAttribute("class", "card-body");
                    header.setAttribute("class", "card-title");
                    subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
                    para.setAttribute("class", "card-text");
                }

            }
        })
        .catch(err => {
            console.error(err)
        })

}