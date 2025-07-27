const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postHTML = document.querySelector(".post");

function render() {
    let post = '';

    for (let i = 0; i < posts.length; i++) {
        post += `<section class="post-card container">
        <div class="post-profile">
            <img src="${posts[i].avatar}" alt="${posts[i].name} Profile picture" width="34px" class="profile">
            <div class="artist-info">
                <p class="user-name">${posts[i].name}</p>
                <p class="user-info">${posts[i].location}</p>
            </div>
        </div>
        <div class="post-image">
            <img src="${posts[i].post}" alt="" width="375px">
        </div>
        <div class="interact-container">
            <div class="interaction-section">
                <img src="images/icon-heart.png" alt="" width="23px">
                <img src="images/icon-comment.png" alt="" width="23px">
                <img src="images/icon-dm.png" alt="" width="23px">
            </div>
            <p class="likes">${posts[i].likes} likes</p>
            <p class="comment"><span>${posts[i].username}</span> ${posts[i].comment}</p>
        </div>
    </section>`
    }

    postHTML.innerHTML = post;
}

render()