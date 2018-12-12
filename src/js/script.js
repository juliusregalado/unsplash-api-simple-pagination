import '../css/main.scss';
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox.min.js';

let apiItems = [];

const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET','https://api.unsplash.com/photos/?client_id=d898f700f854d59eb2003a654ec0421bc3a997dac78a9de5c29fea3c2e3391ec&per_page=30')
    request.onload = () => {
        if(request.status === 200) {
			resolve(request.response)
        } else {
            console.log(reject(Error('error during fetching datas')))
        }       
    }
    request.send();
})
promise
.then(data => {
    // console.log(JSON.parse(data))
    apiItems =  JSON.parse(data).map(element => {
        return ({
            full: element.urls.full,
            thumb: element.urls.thumb
        })
    });
})
.catch(err => {
    console.log(err)
})

let list = new Array();
let pageList = new Array();
let currentPage = 1;
let numberPerPage = 8;
let numberOfPages = 3;

let makeList = () => {
    for (let x = 0; x < apiItems.length; x++)
        list.push(apiItems[x]);
        numberOfPages = getNumberOfPages();
}

let getNumberOfPages = () => {
    return Math.ceil(list.length / numberPerPage);
}

let nextPage = () => {
    currentPage += 1;
    loadList();
}

let previousPage = () => {
    currentPage -= 1;
    loadList();
}

let firstPage = () => {
    currentPage = 1;
    loadList();
}

let lastPage = () => {
    currentPage = numberOfPages;
    loadList();
}

let loadList = () => {
    let begin = ((currentPage - 1) * numberPerPage);
    let end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
    console.log(pageList)
}

let drawList = () => {
    document.getElementById("list").innerHTML = "";
    for (let r = 0; r < pageList.length; r++) {
        document.getElementById("list").innerHTML += `<div class="col-12 col-md-3"><a href="${pageList[r].full}" data-lightbox="gallery"><img src="${pageList[r].thumb}" class="splash-feed-img" id="myImg${r}"></a></div>`
    }
}

let check = () => {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

let load = () => {
    makeList();
    loadList();
}
    
window.onload = load;


document.getElementById('first').addEventListener('click', firstPage);
document.getElementById('next').addEventListener('click', nextPage);
document.getElementById('previous').addEventListener('click', previousPage);
document.getElementById('last').addEventListener('click', lastPage);
