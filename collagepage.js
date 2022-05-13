let apiData = [];

let apiURL = "https://api.airtable.com/v0/app8RgVA6lZq2fZWi/Table%201?api_key=keywAZV6i7Nn9FtnI";

let seasonShows = [];

const select_menu = document.getElementById("season_show_select");
const image_container = document.getElementById("image_container");
const color_button = document.getElementById("change_border_color");

//only to request data from the api
async function fetchData(url){
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

//which will also push data into apiData[] to make it more usable
async function getData(){
    let data = await fetchData(apiURL);

    for(let i = 0; i<data.records.length; i++){
        let record = data.records[i].fields;
        apiData.push(record);   
    }

    console.log(apiData);
    // makeDropdown();

    select_menu.addEventListener('change', function selectShow(event){
        imageSearch();
        console.log("successfully searched");
    })

//     select_memu.addEventListener("change", function selectShow(event)
//         imageSearch();
//         console.log("successfully searched");
// })

color_button.addEventListener('click', function changeColor(event){

    document.querySelector("img").style.borderColor = "red";
    })
}
getData();



// function makeDropdown(){
//     //iterate over all the description (season shows)
//     for(let i = 0; i<apiData.length; i++){
//         let showName = apiData[i].season;
//         seasonShows.push(showName);
//     };
//     seasonShows = removeDuplicates(seasonShows);
//     console.log(seasonShows);
//     //for every show in seasonShows, add a new option in the select menu
//     seasonShows.forEach(element => {
//         let new_option = document.createElement("option");
//         new_option.className = "option";
//         new_option.innerHTML = element;
//         new_option.value = element;
//         select_menu.appendChild(new_option);
//     });
// }
function removeDuplicates(arr){
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
function seasonSearch(id){
    let button = document.getElementById(id);
    console.log(button.value);
    //filter
    const results = apiData.filter((entry) => {
        const showNameMatch = entry.season.includes(button.value);
        return showNameMatch;
    });
    renderSortedImages(results,image_container);
}
function featureSearch(id){
    let button = document.getElementById(id);
    console.log(button.value);
    //filter
    const results = apiData.filter((entry) => {
        const showNameMatch = entry.feature.includes(button.value);
        return showNameMatch;
    });
    renderSortedImages(results,image_container);
}
function timeSearch(id){
    let button = document.getElementById(id);
    console.log(button.value);
    //filter
    const results = apiData.filter((entry) => {
        const showNameMatch = entry.time.includes(button.value);
        return showNameMatch;
    });
    renderSortedImages(results,image_container);
}

function renderSortedImages(sortedData, container){
    // container.innerHTML = "";
    sortedData.forEach((entry, index) => {
        const image = document.createElement("img");
        image.src = entry.image[0].url;
        image.id = "season_images";
        container.appendChild(image);
    })
}
function myFunction() {
    var x = document.getElementById("image_container");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function zoomin(){
    var myImg = document.getElementById("image_container");
    var currWidth = myImg.clientWidth;
    if(currWidth == 500){
        alert("Maximum zoom-in level reached.");
    } else{
        myImg.style.width = (currWidth + 50) + "px";
    } 
}
function zoomout(){
    var myImg = document.getElementById("image_container");
    var currWidth = myImg.clientWidth;
    if(currWidth == 50){
        alert("Maximum zoom-out level reached.");
    } else{
        myImg.style.width = (currWidth - 50) + "px";
    }
}
//show hide div onclick
function refreshPage() {
    window.location.href = window.location.href;
  }
  
  /*!
   * Emoji Cursor.js
   * - 90's cursors collection
   * -- https://github.com/tholman/90s-cursor-effects
   * -- https://codepen.io/tholman/full/rxJpdQ
   */
  
  (function emojiCursor() {
    
      var possibleEmoji = ["🌴", "🌷", "🌊", "🌜"]
      var width = window.innerWidth;
      var height = window.innerHeight;
      var cursor = {x: width/2, y: width/2};
      var particles = [];
      
      function init() {
        bindEvents();
        loop();
      }
      
      // Bind events that are needed
      function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);
        
        window.addEventListener('resize', onWindowResize);
      }
      
      function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      
      function onTouchMove(e) {
        if( e.touches.length > 0 ) {
          for( var i = 0; i < e.touches.length; i++ ) {
            addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
          }
        }
      }
      
      function onMouseMove(e) {    
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        
        addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
      }
      
      function addParticle(x, y, character) {
        var particle = new Particle();
        particle.init(x, y, character);
        particles.push(particle);
      }
      
      function updateParticles() {
        
        // Updated
        for( var i = 0; i < particles.length; i++ ) {
          particles[i].update();
        }
        
        // Remove dead particles
        for( var i = particles.length -1; i >= 0; i-- ) {
          if( particles[i].lifeSpan < 0 ) {
            particles[i].die();
            particles.splice(i, 1);
          }
        }
        
      }
      
      function loop() {
        requestAnimationFrame(loop);
        updateParticles();
      }
      
      /**
       * Particles
       */
      
      function Particle() {
    
        this.lifeSpan = 120; //ms
        this.initialStyles ={
          "position": "absolute",
          "display": "block",
          "pointerEvents": "none",
          "z-index": "10000000",
          "fontSize": "16px",
          "will-change": "transform"
        };
    
        // Init, and set properties
        this.init = function(x, y, character) {
    
          this.velocity = {
            x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1
          };
          
          this.position = {x: x - 10, y: y - 20};
    
          this.element = document.createElement('span');
          this.element.innerHTML = character;
          applyProperties(this.element, this.initialStyles);
          this.update();
          
          document.body.appendChild(this.element);
        };
        
        this.update = function() {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.lifeSpan--;
          
          this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        }
        
        this.die = function() {
          this.element.parentNode.removeChild(this.element);
        }
        
      }
      
      /**
       * Utils
       */
      
      // Applies css `properties` to an element.
      function applyProperties( target, properties ) {
        for( var key in properties ) {
          target.style[ key ] = properties[ key ];
        }
      }
      
      init();
    })();