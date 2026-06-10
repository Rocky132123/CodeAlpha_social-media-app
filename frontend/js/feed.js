alert("LATEST FEED JS");
const accessToken =
localStorage.getItem("access");

if (!accessToken) {
    window.location.href =
    "login.html";
}

const postsContainer =
document.getElementById("postsContainer");

const createPostBtn =
document.getElementById("createPostBtn");

const logoutBtn =
document.getElementById("logoutBtn");


console.log("postsContainer =", postsContainer);
console.log("createPostBtn =", createPostBtn);
console.log("logoutBtn =", logoutBtn);

if(!logoutBtn){
    alert("logoutBtn is NULL");
}

if(!createPostBtn){
    alert("createPostBtn is NULL");
}

if(!postsContainer){
    alert("postsContainer is NULL");
}
logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.clear();

        window.location.href =
        "login.html";

    }
);
const profileBtn =
document.getElementById(
    "profileBtn"
);

profileBtn.addEventListener(
    "click",
    () => {

        window.location.href =
        "profile.html";

    }
);


async function loadPosts() {

    postsContainer.innerHTML =
    "<p>Loading Posts...</p>";

    const response =
    await fetch(
        `${API_BASE_URL}/posts/`,
        {
            headers: {
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );

  const posts =
await response.json();

console.table(posts);
    postsContainer.innerHTML = "";

    for (const post of posts) {

        const commentsResponse =
        await fetch(
            `${API_BASE_URL}/comments/post/${post.id}/`
        );

        const comments =
        await commentsResponse.json();

        let commentsHTML = "";

        comments.forEach(
            comment => {

                commentsHTML += `

                    <div class="comment">

                        <strong>
                        ${comment.author_username}
                        </strong>

                        <p>
                        ${comment.content}
                        </p>

                    </div>

                `;

            }
        );

        postsContainer.innerHTML += `

            <div class="post-card">
<h3>

    <a
        href="profile.html?id=${post.author}"
        class="profile-link"
    >

        ${post.author_username}

    </a>

</h3>
                <p>
                    ${post.content}
                </p>

                <small>
                    ${post.created_at}
                </small>

                <hr>

                <h4>
                    Comments
                </h4>

                ${commentsHTML}

                <textarea
                    id="comment-${post.id}"
                    placeholder="Write a comment..."
                ></textarea>

                <button
                    onclick="addComment(${post.id})"
                >
                    Add Comment
                </button>

            </div>

        `;
    }
}



createPostBtn.addEventListener(
    "click",
    async () => {

        const content =
        document
        .getElementById(
            "postContent"
        )
        .value;

        if (!content) {

            alert(
                "Post cannot be empty"
            );

            return;
        }

        const response =
        await fetch(
            `${API_BASE_URL}/posts/create/`,
            {
                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${accessToken}`
                },

                body: JSON.stringify({
                    content
                })
            }
        );

        if (response.ok) {

            document
            .getElementById(
                "postContent"
            )
            .value = "";

            loadPosts();
        }
    }
);



async function addComment(
    postId
) {

    const commentContent =
    document.getElementById(
        `comment-${postId}`
    ).value;

    if (!commentContent) {

        alert(
            "Comment cannot be empty"
        );

        return;
    }

    const response =
    await fetch(
        `${API_BASE_URL}/comments/create/`,
        {
            method: "POST",

            headers: {

                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${accessToken}`
            },

            body: JSON.stringify({

                post: postId,

                content:
                commentContent

            })
        }
    );

    if (response.ok) {

        loadPosts();
    }
}



loadPosts();