
window.addEventListener('load', () => {
    var btn = document.getElementById("myBtn");   
    var modal = document.getElementById("myModal");
    cont = document.getElementById("cont");
    
    json_List = {};// json object
    property = 'items';
    
    data = [];
            
    window.onclick = function(event){
        if(event.target == modal){
            closeModal();
            console.log("modal clicked");
        }
    }
    
  
    
    document.getElementById("jsonfileinput").addEventListener("change", function() {
        var file_to_read = document.getElementById("jsonfileinput").files[0];
        var fileread = new FileReader();
        
        fileread.onload = function(e) {
            var content = e.target.result;
            var jsonData = JSON.parse(content);
            
            for (var i = 0; i < jsonData.items.length; i++) {
                var counter = jsonData.items[i];
                
                var card = document.createElement('div');
                card.classList.add('item'); // Card container
          
                var imgHolder = document.createElement('div');
                var img = document.createElement('img');
                
                var cardtext = document.createElement('div');
                var title = document.createElement('h2');
                var website = document.createElement('p');
                
                var cardicon = document.createElement('div');
                var icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-copy');
                
                
                img.src = "images/profile.png";
                img.height = 50;
                img.width = 50;
                
                cont.appendChild(card);
                card.appendChild(imgHolder);
                imgHolder.appendChild(img);
                
                card.appendChild(cardtext);
                cardtext.appendChild(title);
                cardtext.appendChild(website);
                
                card.appendChild(cardicon);
                cardicon.appendChild(icon);
                
                title.innerHTML = counter.title;
                website.innerHTML = counter.website;
                
               
                _username = counter.username;
                _password = counter.password;
                _email = counter.email;
                _notes = counter.notes;
                
            }
            closeNav();
            
            data.push(counter);
        };
    
    fileread.readAsText(file_to_read);
    });

});
                    

function openModal(){
    document.getElementById("myModal").style.height = "90%";
}

function closeModal(){
    document.getElementById("myModal").style.height = "0";
}

/*
* side navigation controls
*/
function openNav(){
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
}

function addItem(){
    
    var card = document.createElement('div');
    card.classList.add('item'); // Card container
          
    var imgHolder = document.createElement('div');
    var img = document.createElement('img');
                
    var cardtext = document.createElement('div');
    var title = document.createElement('h2');
    var website = document.createElement('p');
                
    var cardicon = document.createElement('div');
    var icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-copy');
                
                
    img.src = "images/profile.png";
    img.height = 50;
    img.width = 50;
                
    cont.appendChild(card);
    card.appendChild(imgHolder);
    imgHolder.appendChild(img);
                
    card.appendChild(cardtext);
    cardtext.appendChild(title);
    cardtext.appendChild(website);
                
    card.appendChild(cardicon);
    cardicon.appendChild(icon);
    
    title.innerHTML = document.getElementById("-title").value;
    website.innerHTML = document.getElementById("-website").value;
    
  
    closeModal();
    saveItem();
    
}

function saveItem(){
    
      todo = {
			title: document.getElementById("-title").value,
			username: document.getElementById("-username").value,
			password: document.getElementById("-password").value,
            website: document.getElementById('-website').value,
            notes: document.getElementById("-notes").value
		  }
   
    data.push(todo);
    json_List[property] = data;
    var data_string = JSON.stringify(json_List);
    var file = new Blob([data_string], {type:"text"});
    var anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(file);
    anchor.download = "items.json";
    anchor.click();
}






