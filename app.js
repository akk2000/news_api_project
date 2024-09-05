const apiKey = 'fb3e87c985cc46bca4e487201864eb98'; 

const articleContainer = document.getElementById('article-container');
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', async ()=>{
    const query = searchField.value.trim(); 
    if(query !== ""){
        try{
            const articles = await fetchNewArticles(query);
            showArticles(articles);
        }catch(error){
            console.error("Error fetching from Search", error); 
        }
    }
});

async function fetchNewArticles(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`; 
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Cannot Fetch Data From Server asdf", error)
        return[];
    }
}
async function fetchingData(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`; 
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Cannot Fetch Data From Server", error)
        return[];
    }
}
async function showArticles(articles){
    articles.forEach((async (article) => {

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card")

        const img = document.createElement("img"); 
        img.src = article.urlToImage; 
        img.alt = article.title; 

        const title = document.createElement("h2");
        title.textContent = article.title;
        
        const paragraph = document.createElement("p");
        paragraph.textContent = article.content;
        blogCard.addEventListener("click", ()=> {
            window.open(article.url, "_blank");
        })
        articleContainer.appendChild(blogContainer);
        blogContainer.appendChild(blogCard);
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(paragraph);
    }))
}
(async ()=> {
    try{
        const articles = await fetchingData();
        showArticles(articles); 
    }catch(error){
        console.error("Cannot Fetch Data From Server 2", error)
        return[];
    }
})();
