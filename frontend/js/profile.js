const accessToken =
localStorage.getItem(
    "access"
);

if(!accessToken){

    window.location.href =
    "login.html";
}

const usernameEl =
document.getElementById(
    "username"
);

const emailEl =
document.getElementById(
    "email"
);

const bioEl =
document.getElementById(
    "bio"
);

const messageEl =
document.getElementById(
    "message"
);

const followersCountEl =
document.getElementById(
    "followersCount"
);

const followingCountEl =
document.getElementById(
    "followingCount"
);

const followBtn =
document.getElementById(
    "followBtn"
);

let currentUserId = null;



async function loadProfile(){

    const response =
    await fetch(
        `${API_BASE_URL}/users/me/`,
        {
            headers:{
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );

    const user =
    await response.json();

    currentUserId =
    user.id;

    usernameEl.innerText =
    user.username;

    emailEl.innerText =
    user.email;

    bioEl.value =
    user.bio || "";

    followersCountEl.innerText =
    user.followers_count || 0;

    followingCountEl.innerText =
    user.following_count || 0;
}



followBtn.addEventListener(
    "click",
    async ()=>{

        const response =
        await fetch(
            `${API_BASE_URL}/users/follow/${currentUserId}/`,
            {

                method:"POST",

                headers:{
                    Authorization:
                    `Bearer ${accessToken}`
                }
            }
        );

        if(response.ok){

            followBtn.innerText =
            "Following";

            loadProfile();
        }
    }
);



document.getElementById(
    "saveBtn"
).addEventListener(
    "click",
    async ()=>{

        const response =
        await fetch(
            `${API_BASE_URL}/users/me/update/`,
            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${accessToken}`
                },

                body:JSON.stringify({

                    bio:
                    bioEl.value
                })
            }
        );

        if(response.ok){

            messageEl.innerText =
            "Profile Updated";
        }
    }
);



document.getElementById(
    "backBtn"
).addEventListener(
    "click",
    ()=>{

        window.location.href =
        "feed.html";
    }
);



document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    ()=>{

        localStorage.clear();

        window.location.href =
        "login.html";
    }
);



loadProfile();