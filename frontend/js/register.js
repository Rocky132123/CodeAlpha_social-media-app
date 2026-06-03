const registerForm =
document.getElementById(
    "registerForm"
);

registerForm.addEventListener(
    "submit",
    async (e)=>{

        e.preventDefault();

        const username =
        document.getElementById(
            "username"
        ).value;

        const email =
        document.getElementById(
            "email"
        ).value;

        const password =
        document.getElementById(
            "password"
        ).value;

        const response =
        await fetch(
            `${API_BASE_URL}/users/register/`,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data =
        await response.json();

        if(response.ok){

            document.getElementById(
                "message"
            ).innerHTML =
            "Registration Successful";

            setTimeout(()=>{

                window.location.href =
                "login.html";

            },1500);

        }

        else{

            document.getElementById(
                "message"
            ).innerHTML =
            JSON.stringify(data);

        }

    }
);