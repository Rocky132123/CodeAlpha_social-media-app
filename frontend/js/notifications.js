const accessToken =
localStorage.getItem(
    "access"
);

if(!accessToken){

    window.location.href =
    "login.html";
}

const notificationsContainer =
document.getElementById(
    "notificationsContainer"
);

async function loadNotifications(){

    const response =
    await fetch(
        `${API_BASE_URL}/notifications/`,
        {
            headers:{
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );

    const notifications =
    await response.json();

    notificationsContainer.innerHTML =
    "";

    notifications.forEach(
        notification => {

            notificationsContainer.innerHTML += `

                <div
                    class="notification-card"
                >

                    <h3>
                        ${notification.message}
                    </h3>

                    <p
                        class="notification-time"
                    >
                        ${notification.created_at}
                    </p>

                </div>

            `;
        }
    );
}

document.getElementById(
    "backBtn"
).addEventListener(
    "click",
    () => {

        window.location.href =
        "feed.html";
    }
);

loadNotifications();