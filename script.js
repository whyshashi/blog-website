import { iteratepost  } from "./iteratePost.js";


let login = document.querySelector("#login");
let signup = document.querySelector("#signup");
let addpost = document.querySelector("#addpost");
let mainURL = "http://localhost:3000/"
let pageNum=1;
let container = document.querySelector("#container");
let pageselect = document.querySelector("#pagenum");


signup.addEventListener("click",()=>{
    window.location.href="./utils/signup.html";
})
// loginlogout logic
function loginlogout(){
    let j = localStorage.getItem("loggedUser");
    if(j){
        login.innerText="Logout";
    }
    else{
        login.innerText="Login";
    }
}

loginlogout();



login.addEventListener("click",()=>{
    let j = localStorage.getItem("loggedUser");
    if(j){
        localStorage.removeItem("loggedUser");
        loginlogout();
    }
    else if(!j){
        window.location.href="./utils/login.html";
    }

})


addpost.addEventListener("click",()=>{
    window.location.href="./utils/addPost.html";
})

async function fetchData(l,page=1){
    let t = await fetch(`http://localhost:3000/${l}?_page=${page}&_limit=4`);
    let data = await t.json();
    console.log(data);
    iteratepost(data);
}

fetchData("posts");




let searchform = document.querySelector("#searchform");
searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let para1 = e.target[0].value;
    let para2 = e.target[1].value;
    handlesearch(para1,para2);
})

async function handlesearch(para1,para2){

    let t = await fetch(`http://localhost:3000/posts`);
    let data = await t.json();
    let dat = data.filter((ele)=>{
        return ele[`${para1}`].includes(para2);
    })
    iteratepost(dat);
}

let filterbycat = document.querySelector("#filterbycat");

async function categoryf(){
    let t = await fetch(`http://localhost:3000/categoryList`);
    let data = await t.json();
    data.forEach(ele => {
        let ot = document.createElement("option");
        ot.innerText = ele;
        filterbycat.append(ot);
    });
}
categoryf();

filterbycat.addEventListener("change",(ele)=>{
    handlecategory(filterbycat.value);
})

async function handlecategory(val){
    let t = await fetch(`http://localhost:3000/posts/`);
    let data = await t.json();
    if(val==""){
        iteratepost(data);
    }
    else{
        let dat = data.filter((ele)=>{
            return ele.category===val;
        })
        iteratepost(dat);
    }
}

let left = document.querySelector("#left");

left.addEventListener("click",(e)=>{
    if(pageNum===1){
        console.log('already at 1st page');
    }
    else{
        pageNum--;
        pageselect.innerText=`${pageNum}`;
        fetchData("posts",pageNum);
    }
})
let right = document.querySelector("#right");


right.addEventListener("click",(e)=>{

        pageNum++;
        pageselect.innerText=`${pageNum}`;
        fetchData("posts",pageNum);
   
})
