const accessToken = localStorage.getItem("access");

if (!accessToken) {
    window.location.href = "login.html";
}

const postsContainer = document.getElementById("postsContainer");
const createPostBtn = document.getElementById("createPostBtn");
const logoutBtn = document.getElementById("logoutBtn");
const profileBtn = document.getElementById("profileBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const refreshFeedBtn = document.getElementById("refreshFeedBtn");
const suggestedUsers = document.getElementById("suggestedUsers");
const notificationsBtn = document.getElementById("notificationsBtn");

// ── Navigation ────────────────────────────────────────────────
logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
});

profileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
});

notificationsBtn.addEventListener("click", () => {
    window.location.href = "notifications.html";
});

refreshFeedBtn.addEventListener("click", loadPosts);

searchBtn.addEventListener("click", searchUsers);

// ── Load Posts ────────────────────────────────────────────────
async function loadPosts() {
    postsContainer.innerHTML = "<p>Loading posts...</p>";

    const response = await fetch(`${API_BASE_URL}/posts/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const posts = await response.json();

    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="empty-feed">
                <h3>No Posts Yet</h3>
                <p>Follow users to see their posts.</p>
            </div>`;
        return;
    }

    postsContainer.innerHTML = "";

    for (const post of posts) {
        const commentsResponse = await fetch(
            `${API_BASE_URL}/comments/post/${post.id}/`
        );
        const comments = await commentsResponse.json();

        let commentsHTML = "";
        comments.forEach(comment => {
            commentsHTML += `
                <div class="comment">
                    <strong>${comment.author_username}</strong>
                    <p>${comment.content}</p>
                </div>`;
        });

        // Profile picture — use avatar placeholder if null
        const pfp = post.author_profile_picture
            ? post.author_profile_picture
            : `https://ui-avatars.com/api/?name=${post.author_username}&background=b8860b&color=fff`;

        // Post image — build full URL if relative path
        const postImageHTML = post.image
            ? `<img src="${post.image.startsWith("http") ? post.image : API_BASE_URL.replace("/api", "") + post.image}" class="post-image">`
            : "";

        // Format date nicely
        const date = new Date(post.created_at).toLocaleString();

        postsContainer.innerHTML += `
            <div class="post-card">
                <div class="post-header">
                    <img src="${pfp}" class="post-pfp">
                    <a href="profile.html?id=${post.author}" class="profile-link">
                        ${post.author_username}
                    </a>
                </div>

                <p>${post.content}</p>

                ${postImageHTML}

                <p class="likes-count">❤️ ${post.likes_count || 0} Likes</p>

                <button onclick="likePost(${post.id})">❤️ Like</button>

                <small>${date}</small>

                <hr>

                <h4>Comments</h4>

                ${commentsHTML}

                <textarea
                    id="comment-${post.id}"
                    placeholder="Write a comment..."
                ></textarea>

                <button onclick="addComment(${post.id})">Add Comment</button>
            </div>`;
    }
}

// ── Create Post ───────────────────────────────────────────────
createPostBtn.addEventListener("click", async () => {
    const content = document.getElementById("postContent").value.trim();
    const image = document.getElementById("postImage").files[0];

    if (!content) {
        alert("Please write something before posting.");
        return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
        formData.append("image", image);
    }

    createPostBtn.disabled = true;
    createPostBtn.textContent = "Posting...";

    try {
        const response = await fetch(`${API_BASE_URL}/posts/create/`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData
        });

        if (response.ok) {
            document.getElementById("postContent").value = "";
            document.getElementById("postImage").value = "";
            loadPosts();
        } else {
            const data = await response.json();
            alert(JSON.stringify(data));
        }
    } catch (error) {
        alert("Server error. Please try again.");
    } finally {
        createPostBtn.disabled = false;
        createPostBtn.textContent = "Create Post";
    }
});

// ── Add Comment ───────────────────────────────────────────────
async function addComment(postId) {
    const commentContent = document.getElementById(`comment-${postId}`).value;

    if (!commentContent) {
        alert("Comment cannot be empty");
        return;
    }

    const response = await fetch(`${API_BASE_URL}/comments/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ post: postId, content: commentContent })
    });

    if (response.ok) {
        loadPosts();
    }
}

// ── Like Post ─────────────────────────────────────────────────
async function likePost(postId) {
    const response = await fetch(`${API_BASE_URL}/posts/like/${postId}/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data = await response.json();

    if (response.ok) {
        loadPosts();
    } else {
        alert(data.error || "Unable to like post");
    }
}

// ── Search Users ──────────────────────────────────────────────
async function searchUsers() {
    const query = searchInput.value;

    if (!query) return;

    const response = await fetch(`${API_BASE_URL}/users/search/?q=${query}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const users = await response.json();

    searchResults.innerHTML = "";
    users.forEach(user => {
        searchResults.innerHTML += `
            <div class="search-result">
                <strong>${user.username}</strong><br>
                <a href="profile.html?id=${user.id}">View Profile</a>
            </div>`;
    });
}

// ── Load Suggestions ──────────────────────────────────────────
async function loadSuggestions() {
    const response = await fetch(`${API_BASE_URL}/users/search/?q=`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const users = await response.json();

    suggestedUsers.innerHTML = "";
    users.slice(0, 5).forEach(user => {
        suggestedUsers.innerHTML += `
            <div class="suggestion">
                <a href="profile.html?id=${user.id}">${user.username}</a>
            </div>`;
    });
}

// ── Init ──────────────────────────────────────────────────────
loadPosts();
loadSuggestions();