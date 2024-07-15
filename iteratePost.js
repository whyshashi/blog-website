
export async function iteratepost(data){
    container.innerText="";
    console.log(data);

    data.forEach((ele) => {
        let card = document.createElement("div");
        card.id = "card";

        let title = document.createElement("h1");
        title.id = "title";
        title.innerText = ele.title;

        let author = document.createElement("h2");
        author.id = "author";
        author.innerText = `Author : ${ele.username}`;

        let category = document.createElement("h2");
        category.id = "category";
        category.innerText = ele.category;

        let post_text = document.createElement("p");
        post_text.id = "post_text";
        post_text.innerText = ele.post_text;

        let innercard1 = document.createElement("div");
        innercard1.id = "innercard1";

        let innercard2 = document.createElement("div");
        innercard2.id = "innercard2";

        let comments = document.createElement("button");
        comments.id = "comments";
        comments.innerText = "comments";

        let com_flag = false;
        comments.addEventListener("click",()=>{
            if(com_flag==false){
                com_flag=true;
                showComments(ele);
            }
            else{
                com_flag = false;
                innercard2.style.display = "none";
            }
        })

        innercard1.append(comments);
        card.append(title,author,category,post_text,innercard1,innercard2);
        container.append(card);

    });
}

function showComments(tt){

    //  i have to declare inner card thingsd
    let innercard2 = document.querySelector("#innercard2");
    innercard2.innerText = "";
    innercard2.style.display = "block";
    tt.comments.forEach((ele)=>{
        
        let userComment = document.createElement("p");
        userComment.id ="userComment";
        userComment.innerText = `${ele.username} : ${ele.comment_Text}`;

        innercard2.append(userComment);
    })

    // let commentform = document.createElement("form");
    // commentform.id = "commentform";

    // let com_inp = document.createElement("input");
    // com_inp.placeholder = "enter comment";

    // let comsub= document.createElement("button");
    // comsub.type = "submit";
    // comsub.innerText="submit";

    // commentform.append(com_inp,comsub);
    // innercard2.append(commentform);

}