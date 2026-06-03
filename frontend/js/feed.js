document.getElementById(
    "profileBtn"
).addEventListener(
    "click",
    ()=>{

        window.location.href =
        "profile.html";
    }
);
const accessToken =
localStorage.getItem(
    "access"
);

if(!accessToken){

    window.location.href =
    "login.html";
}

const postsContainer =
document.getElementById(
    "postsContainer"
);

const createPostBtn =
document.getElementById(
    "createPostBtn"
);

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

logoutBtn.addEventListener(
    "click",
    ()=>{

        localStorage.clear();

        window.location.href =
        "login.html";
    }
);

async function loadPosts(){

    try{

        const response =
        await fetch(
            `${API_BASE_URL}/posts/`
        );

        const posts =
        await response.json();

        postsContainer.innerHTML =
        "";

        posts.forEach(post=>{

            postsContainer.innerHTML +=

            `
            <div class="post-card">

                <div class="username">

                    ${post.author_username}

                </div>

                <div>

                    ${post.content}

                </div>

                <div class="date">

                    ${new Date(
                        post.created_at
                    ).toLocaleString()}

                </div>

            </div>
            `;
        });

    }

    catch(error){

        console.log(error);
    }
}

createPostBtn.addEventListener(
    "click",
    async ()=>{

        const content =
        document.getElementById(
            "postContent"
        ).value;

        if(!content){

            alert(
                "Post content required"
            );

            return;
        }

        const response =
        await fetch(
            `${API_BASE_URL}/posts/create/`,
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json",

                    "Authorization":
                    `Bearer ${accessToken}`
                },

                body:JSON.stringify({

                    content
                })
            }
        );

        if(response.ok){

            document.getElementById(
                "postContent"
            ).value =
            "";

            loadPosts();
        }

        else{

            const error =
            await response.json();

            console.log(error);

            alert(
                "Post creation failed"
            );
        }
    }
);

loadPosts();