const accessToken =
localStorage.getItem(
    "access"
);

if(!accessToken){

    window.location.href =
    "login.html";
}

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

async function loadProfile(){

    try{

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

        document.getElementById(
            "username"
        ).innerText =
        user.username;

        document.getElementById(
            "email"
        ).innerText =
        user.email;

        document.getElementById(
            "bio"
        ).value =
        user.bio || "";

    }

    catch(error){

        console.log(error);
    }
}

document.getElementById(
    "saveBtn"
).addEventListener(
    "click",
    async ()=>{

        const bio =
        document.getElementById(
            "bio"
        ).value;

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
                    bio
                })
            }
        );

        if(response.ok){

            document.getElementById(
                "message"
            ).innerText =
            "Profile Updated Successfully";

        }

        else{

            document.getElementById(
                "message"
            ).innerText =
            "Update Failed";
        }
    }
);

loadProfile();