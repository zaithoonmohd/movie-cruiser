var movieList1=[];
var favList1=[];
function getMovies() {
  return  fetch('http://localhost:3000/movies')
    .then(response =>{
        if(response.status == 200)
        {
            return Promise.resolve(response.json());
        }
        else
        {
            return Promise.reject(new Error('Unable to fetch the Data !!!'));
        }
    }).then(movieList =>{
        //console.log(movieList);
        movieList1=movieList;
        const ul = document.getElementById('moviesList');
        let mvInnerHtml='';     
        movieList.forEach(movie => {
            //console.log(movie.title);
            mvInnerHtml =  mvInnerHtml + 
            `
                <li style="list-style:none">
                    <h4>
                        ${movie.title}
                    </h4>
                    <img src="${movie.imageUrl}" height="250" width="100%">
                        

                    <p>
                        ${movie.description}
                    </p>
                    <button class="btn btn-primary" 
                    onclick=addFavourite(${movie.id})>AddtoFav</button>
                  </li> 
                  <br>                    
                `
                ul.innerHTML=mvInnerHtml;
                
        });
       return movieList;
    })
    .catch(err=>{
        console.log(err);
    })
}

function getFavourites() {
    return fetch('http://localhost:3000/favourites')
    .then(response =>{
        if(response.status == 200)
        {
            return Promise.resolve(response.json());
        }
        else
        {
            return Promise.reject(new Error('Unable to fetch the Data !!!'));
        }
    }).then(favList =>{
        //console.log(favList);
        favList1=favList;
        const ul = document.getElementById('favouritesList');
        let favInnerHtml='';     
        favList.forEach(favMovie => {
            //console.log(favMovie.title);
            favInnerHtml =  favInnerHtml + 
            `
                <li style="list-style:none">
                    <h4>
                        ${favMovie.title}
                    </h4>
                    <img src="${favMovie.imageUrl}" height="250" width="100%">
                        

                    <p>
                        ${favMovie.description}
                    </p>
                    </li>
                    <br>
                    
                `
                ul.innerHTML=favInnerHtml;
                
        });
       return favList;
    })
    .catch(err=>{
        console.log(err);
    })
}

function addFavourite(id) {
     
    if(typeof(favList1.find((favObj)=>favObj.id===id))==='object'){
    alert("Movie is already added to favourites");
    return Promise.reject({message: 'Movie is already added to favourites'});}
    else{
        movieObj=movieList1.find((mvObj)=>mvObj.id===id)
    
    return fetch('http://localhost:3000/favourites',{
        method:'POST',
        body:JSON.stringify(movieObj),
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>{
        alert('Record Added !!!!');
        return response;
    }).then(favMovObj=>{
        //console.log(movieObj);
        favList1.push(movieObj);
        
        const ul = document.getElementById('favouritesList');
        let favInnerHtml='';     
        favList1.forEach(favMovie => {
            //console.log(favMovie.title);
            favInnerHtml =  favInnerHtml + 
            `
                <li style="list-style:none">
                    <h4>
                        ${favMovie.title}
                    </h4>
                    <img src="${favMovie.imageUrl}" height="250" width="100%">
                        

                    <p>
                        ${favMovie.description}
                    </p>
                    </li>
                    <br>
                    
                `
                ul.innerHTML=favInnerHtml;
              
        });
        //console.log(favList1);
        return favList1;    
    }).catch(error => Promise.resolve(Error(error)));
    
    }
    
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


