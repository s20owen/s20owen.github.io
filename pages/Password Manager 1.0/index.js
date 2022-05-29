
window.addEventListener('load', () => {
    var btn = document.getElementById("myBtn");   
    var modal = document.getElementById("myModal");
    cont = document.getElementById("cont");
    var _export = document.getElementById("export");
    _export.addEventListener('click', exportFile);
    
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
		    
		card.id = [i];
                card.title = counter.title;
                card.username = counter.username;
                card.password = counter.password;
                card.email = counter.email;
                card.website = counter.website;
                card.notes = counter.notes;
                
                card.addEventListener('click', cardClicked);
          
                var imgHolder = document.createElement('div');
                var img = document.createElement('img');
                
                var cardtext = document.createElement('div');
                var title = document.createElement('h2');
                var website = document.createElement('p');
                
                var cardicon = document.createElement('div');
                var icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-copy');
                
                
                img.src = "https://logo.clearbit.com/" + counter.title +".com";
                img.height = 50;
                img.width = 50;
                
                img.addEventListener('error', function handleError() {
                    var defaultImage  = "images/profile.png";
                    img.src = defaultImage;
                });
                
                
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
    document.getElementById("myModal").style.height = "100%";
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

function cardClicked(){
    //alert(e.target.innerText);
    //alert(this.title);
    var im = document.getElementById("image");
    document.getElementById("details-container").style.display = "block";
    document.getElementById("details-container").style.height = "auto";
    im.src = "https://logo.clearbit.com/" + this.title +".com";
    im.width = 50;
    im.height = 50;
    im.addEventListener('error', function handleError() {
         var defaultImage  = "images/profile.png";
         im.src = defaultImage;
    });
    document.getElementById("tit").innerHTML = this.title;
    document.getElementById("pass").innerHTML = this.password;
    document.getElementById("user").innerHTML = this.username;
    document.getElementById("web").innerHTML = this.website;
    document.getElementById("ema").innerHTML = this.email;
    document.getElementById("no").innerHTML = this.notes;
}

function closeDetails(){
    console.log("clicked");
    document.getElementById("details-container").style.display = "none";
}

function exportFile(){
    json_List[property] = data;
    var data_string = JSON.stringify(json_List);
    var file = new Blob([data_string], {type:"text"});
    var anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(file);
    anchor.download = "items.json";
    anchor.click();
    closeNav();
}

function addItem(){
    
    var card = document.createElement('div');
    card.classList.add('item'); // Card container
	
    card.addEventListener('click', cardClicked);
          
    var imgHolder = document.createElement('div');
    var img = document.createElement('img');
                
    var cardtext = document.createElement('div');
    var title = document.createElement('h2');
    var website = document.createElement('p');
                
    var cardicon = document.createElement('div');
    var icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-copy');
                
                
 	img.src = "https://logo.clearbit.com/" + document.getElementById("-title").value + ".com";
        img.height = 50;
        img.width = 50;
                
        img.addEventListener('error', function handleError() {
             var defaultImage  = "images/profile.png";
             img.src = defaultImage;
        });
                
                
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
	
    card.title = document.getElementById('-title').value;
    card.username = document.getElementById('-username').value;
    card.password = document.getElementById('-password').value;
    card.email = document.getElementById('-email').value
    card.website = document.getElementById('-website').value;
    card.notes = document.getElementById('-notes').value;
    
  
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
}






