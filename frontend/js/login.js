const loginForm =
document.getElementById(
    "loginForm"
);

loginForm.addEventListener(
    "submit",
    async (e)=>{

        e.preventDefault();

        const username =
        document.getElementById(
            "username"
        ).value;

        const password =
        document.getElementById(
            "password"
        ).value;

        const response =
        await fetch(
            `${API_BASE_URL}/users/login/`,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data =
        await response.json();

        if(response.ok){

            localStorage.setItem(
                "access",
                data.access
            );

            localStorage.setItem(
                "refresh",
                data.refresh
            );

           window.location.href =
"feed.html";

        }

       else{

    console.log("Response:", data);

    document.getElementById(
        "message"
    ).innerHTML =
    JSON.stringify(data);

}

    }
    
);