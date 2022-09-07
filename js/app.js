const loadCetagory= async()=>{
    const url= "https://openapi.programming-hero.com/api/news/categories"
    try{
        const res= await fetch(url);
        const data= await res.json();
        displayCetagory(data.data.news_category);
    }
    catch(error){
        console.log(error); 
    }
}

const displayCetagory = cetagories =>{
    const liContainer= document.getElementById('li-container');
    cetagories.forEach(cetagory =>{
        const createLi= document.createElement('li');
        createLi.classList.add('list-item')
        createLi.innerHTML= `
            <a onclick="linkClicked('${cetagory.category_id}')"> ${cetagory.category_name}</a>
        `
        liContainer.appendChild(createLi);
        sipnnerControl(true);
    })
    
    
}

const showCetagory= async()=>{
    const url= "https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a"
    const res= await fetch(url);
    const data= await res.json();
    console.log(data);
}
const linkClicked= async(categoryId)=>{
    const url=(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const res= await fetch(url);
    const data= await res.json();
    showFashionCard(data.data);
    console.log(data.data);
}

const showFashionCard = catUrls =>{
    const displayCard= document.getElementById('display-card');
    displayCard.innerHTML='';
     
    var totalView=catUrls.slice(0);
    totalView.sort(function(a,b){
        return b.total_view-a.total_view;
    });
    console.log(catUrls);
    totalView.forEach(catUrl=>{
        const createDiv= document.createElement('div');
        createDiv.innerHTML=`
        <div class="card mb-3 w-100">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${catUrl.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${catUrl.title}</h5>
                    <p class="card-text text-muted">${catUrl.details.slice(0,300)}...</p>
                    
                    <div class= "d-flex justify-content-between">
                        <div class="d-flex">
                            <div class="me-3"><img style="width: 50px;" class="rounded-circle" src="${catUrl.author.img}" alt=""></div>
                            <div>
                                ${catUrl.author.name}
                                <p class="card-text"><small class="text-muted">${catUrl.author.published_date}</small></p>
                            </div>
                        </div>
                        <div>
                            <small class="text-muted">Total views: ${catUrl.total_view}</small>
                        </div>
                        <div>
                            <button onclick="modalDetail('${catUrl._id}')" class="btn btn-warning text-light" type="button"data-bs-toggle="modal" data-bs-target="#newsDetails">View Details</button>
                        </div>
                    </div>
                </div>     
                </div>
            </div>
        </div>
        `;
        displayCard.appendChild(createDiv);
    
    })
    sipnnerControl(false);

    const showItemClount = document.getElementById('item-count');
    showItemClount.innerHTML=`
    <p class="p-3">${catUrls.length} items found for category </p>
    `
}
const modalDetail= (userId)=>{
    const url= `https://openapi.programming-hero.com/api/news/${userId}`
    fetch(url)
    .then(res=> res.json())
    .then(data=>modalInfo(data.data[0]))
}
const modalInfo=(data)=>{
    console.log(data);
    const modalBody= document.getElementById('modal-body');
    modalBody.innerHTML="";
    const createDiv= document.createElement('div');
    createDiv.innerHTML=`
        <div class="card w-100" >
            <img src="${data.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.details.slice(0,200)}</p>
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Author Name: ${data.author.name}</li>
                <li class="list-group-item">Rlease Date: ${data.author.published_date}</li>
                <li class="list-group-item">Total View: ${data.total_view}</li>
                <li class="list-group-item">Rating: ${data.rating.number}</li>
            </ul>
        </div>
    `
    modalBody.appendChild(createDiv);
}

const sipnnerControl=(isLoading)=>{
    const loaderSection= document.getElementById('spinner');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

loadCetagory();
showCetagory();