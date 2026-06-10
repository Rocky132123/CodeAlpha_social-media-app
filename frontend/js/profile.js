const accessToken =
localStorage.getItem("access");

if (!accessToken) {

    window.location.href =
    "login.html";
}

const usernameEl =
document.getElementById("username");

const emailEl =
document.getElementById("email");

const bioEl =
document.getElementById("bio");

const messageEl =
document.getElementById("message");

const followersCountEl =
document.getElementById("followersCount");

const followingCountEl =
document.getElementById("followingCount");

const followBtn =
document.getElementById("followBtn");

const saveBtn =
document.getElementById("saveBtn");

let currentUserId = null;
let viewedUserId = null;



async function loadProfile() {

    const params =
    new URLSearchParams(
        window.location.search
    );

    viewedUserId =
    params.get("id");



    const meResponse =
    await fetch(
        `${API_BASE_URL}/users/me/`,
        {
            headers: {
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );

    const me =
    await meResponse.json();

    currentUserId =
    me.id;



    const profileUrl =

    viewedUserId

    ?

    `${API_BASE_URL}/users/profile/${viewedUserId}/`

    :

    `${API_BASE_URL}/users/me/`;



    const profileResponse =
    await fetch(
        profileUrl,
        {
            headers: {
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );

    const user =
    await profileResponse.json();

    console.log(
        "PROFILE DATA:",
        user
    );



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



    if (user.is_following) {

        followBtn.innerText =
        "Following";

    }
    else {

        followBtn.innerText =
        "Follow";

    }



    if (user.id === currentUserId) {

        followBtn.style.display =
        "none";

        bioEl.disabled = false;

        saveBtn.style.display =
        "inline-block";
    }
    else {

        followBtn.style.display =
        "inline-block";

        bioEl.disabled = true;

        saveBtn.style.display =
        "none";
    }
}



followBtn.addEventListener(
    "click",
    async () => {

        const response =
        await fetch(
            `${API_BASE_URL}/users/follow/${viewedUserId}/`,
            {
                method: "POST",

                headers: {
                    Authorization:
                    `Bearer ${accessToken}`
                }
            }
        );

        const data =
        await response.json();

        if (response.ok) {

            console.log(data);

            loadProfile();
        }
        else {

            alert(
                data.error ||
                "Follow failed"
            );
        }
    }
);



saveBtn.addEventListener(
    "click",
    async () => {

        const response =
        await fetch(
            `${API_BASE_URL}/users/me/update/`,
            {
                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${accessToken}`
                },

                body: JSON.stringify({

                    bio:
                    bioEl.value
                })
            }
        );

        if (response.ok) {

            messageEl.innerText =
            "Profile Updated Successfully";
        }
        else {

            messageEl.innerText =
            "Update Failed";
        }
    }
);



document.getElementById(
    "backBtn"
).addEventListener(
    "click",
    () => {

        window.location.href =
        "feed.html";
    }
);



document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    () => {

        localStorage.clear();

        window.location.href =
        "login.html";
    }
);



loadProfile();