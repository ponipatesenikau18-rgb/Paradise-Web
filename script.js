// =====================================================
// CONNECT SOCIAL MEDIA - JAVASCRIPT
// =====================================================


// ===============================
// NAVIGATION
// ===============================

const sections = {
    home: document.getElementById("homeSection"),
    profile: document.getElementById("profileSection"),
    messages: document.getElementById("messagesSection"),
    notifications: document.getElementById("notificationsSection"),
    friends: document.getElementById("friendsSection")
};

function showSection(name) {

    // Hide all sections
    for (let key in sections) {
        if (sections[key]) {
            sections[key].classList.add("hidden");
        }
    }

    // Show selected section
    if (sections[name]) {
        sections[name].classList.remove("hidden");
    }

    // Update navigation buttons
    document.querySelectorAll("[data-section]").forEach(button => {
        button.classList.remove("active");

        if (button.dataset.section === name) {
            button.classList.add("active");
        }
    });
}


// Sidebar buttons
document.querySelectorAll(".side-link").forEach(button => {

    button.addEventListener("click", function () {

        if (this.dataset.section) {
            showSection(this.dataset.section);
        }

    });

});


// Top navigation buttons
document.querySelectorAll(".nav-btn[data-section]").forEach(button => {

    button.addEventListener("click", function () {

        showSection(this.dataset.section);

    });

});


// ===============================
// DARK MODE
// ===============================

const themeButton = document.getElementById("themeBtn");

if (themeButton) {

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        const icon = this.querySelector("i");

        if (document.body.classList.contains("dark")) {

            icon.className = "fa-solid fa-sun";

            localStorage.setItem("theme", "dark");

        } else {

            icon.className = "fa-solid fa-moon";

            localStorage.setItem("theme", "light");

        }

    });

}


// Load saved theme
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    if (themeButton) {
        themeButton.querySelector("i").className =
            "fa-solid fa-sun";
    }

}


// ===============================
// LIKE BUTTON
// ===============================

function activateLikeButton(button) {

    button.addEventListener("click", function () {

        this.classList.toggle("liked");

        if (this.classList.contains("liked")) {

            this.innerHTML =
                '<i class="fa-solid fa-heart"></i> Liked';

        } else {

            this.innerHTML =
                '<i class="fa-regular fa-heart"></i> Like';

        }

    });

}


document.querySelectorAll(".like-btn").forEach(button => {

    activateLikeButton(button);

});


// ===============================
// SHARE BUTTON
// ===============================

function activateShareButton(button) {

    button.addEventListener("click", function () {

        const currentButton = this;

        if (navigator.share) {

            navigator.share({
                title: "Connect",
                text: "Check out this post!",
                url: window.location.href
            }).catch(() => {});

        } else {

            navigator.clipboard.writeText(
                window.location.href
            ).then(() => {

                currentButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Copied!';

                setTimeout(() => {

                    currentButton.innerHTML =
                        '<i class="fa-solid fa-share"></i> Share';

                }, 2000);

            }).catch(() => {

                alert("Post link: " + window.location.href);

            });

        }

    });

}


document.querySelectorAll(".share-btn").forEach(button => {

    activateShareButton(button);

});


// ===============================
// COMMENT BUTTON
// ===============================

document.querySelectorAll(".comment-btn").forEach(button => {

    button.addEventListener("click", function () {

        const post = this.closest(".post");

        if (!post) return;

        const input =
            post.querySelector(".comment-input input");

        if (input) {
            input.focus();
        }

    });

});


// ===============================
// COMMENTS
// ===============================

function activateCommentBox(box) {

    const input = box.querySelector("input");
    const send = box.querySelector("button");

    if (!input || !send) return;


    function addComment() {

        const text = input.value.trim();

        if (text === "") {
            return;
        }

        const comment = document.createElement("div");

        comment.className = "comment";

        const image = document.createElement("img");

        image.src =
            "https://i.pravatar.cc/50?img=12";

        image.alt = "Your profile";


        const commentContent =
            document.createElement("div");

        const name =
            document.createElement("strong");

        name.textContent = "You";


        const message =
            document.createElement("p");

        message.textContent = text;


        commentContent.appendChild(name);
        commentContent.appendChild(message);

        comment.appendChild(image);
        comment.appendChild(commentContent);


        box.parentElement.insertBefore(
            comment,
            box
        );


        input.value = "";

    }


    send.addEventListener("click", addComment);


    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            addComment();

        }

    });

}


document.querySelectorAll(".comment-input").forEach(box => {

    activateCommentBox(box);

});


// ===============================
// FOLLOW BUTTON
// ===============================

document.querySelectorAll(".follow-btn").forEach(button => {

    button.addEventListener("click", function () {

        if (this.dataset.following === "true") {

            this.dataset.following = "false";

            this.textContent = "Follow";

        } else {

            this.dataset.following = "true";

            this.textContent = "Following";

        }

    });

});


// ===============================
// CREATE POST MODAL
// ===============================

const modal =
    document.getElementById("postModal");

const openPost =
    document.getElementById("openPostModal");

const sideCreate =
    document.getElementById("createPostSide");

const closePost =
    document.querySelector(".close-modal");


function openModal() {

    if (modal) {
        modal.classList.add("show");
    }

}


function closeModal() {

    if (modal) {
        modal.classList.remove("show");
    }

}


if (openPost) {
    openPost.addEventListener("click", openModal);
}


if (sideCreate) {
    sideCreate.addEventListener("click", openModal);
}


if (closePost) {
    closePost.addEventListener("click", closeModal);
}


if (modal) {

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {
            closeModal();
        }

    });

}


// ===============================
// PUBLISH POST
// ===============================

const publishButton =
    document.getElementById("publishPost");

if (publishButton) {

    publishButton.addEventListener("click", function () {

        const text =
            document.getElementById("newPostText").value.trim();

        const image =
            document.getElementById("newImageURL").value.trim();


        if (text === "" && image === "") {

            alert(
                "Please write something or add an image."
            );

            return;

        }


        const post =
            document.createElement("article");

        post.className = "post";


        // Post header
        const header =
            document.createElement("div");

        header.className = "post-header";


        const profileImage =
            document.createElement("img");

        profileImage.src =
            "https://i.pravatar.cc/100?img=12";

        profileImage.alt =
            "Your profile";


        const userInfo =
            document.createElement("div");


        const username =
            document.createElement("h3");

        username.textContent =
            "Alex Senikau";


        const time =
            document.createElement("p");

        time.textContent =
            "@alexsenikau · Just now";


        userInfo.appendChild(username);
        userInfo.appendChild(time);


        header.appendChild(profileImage);
        header.appendChild(userInfo);


        post.appendChild(header);


        // Post text
        if (text !== "") {

            const paragraph =
                document.createElement("p");

            paragraph.className = "post-text";

            paragraph.textContent = text;

            post.appendChild(paragraph);

        }


        // Post image
        if (image !== "") {

            const postImage =
                document.createElement("img");

            postImage.className =
                "post-image";

            postImage.src = image;

            postImage.alt =
                "User post";

            post.appendChild(postImage);

        }


        // Post information
        const info =
            document.createElement("div");

        info.className = "post-info";

        info.innerHTML =
            "<span>❤️ 0</span><span>0 comments</span>";

        post.appendChild(info);


        // Buttons
        const actions =
            document.createElement("div");

        actions.className = "post-actions";


        const like =
            document.createElement("button");

        like.className = "like-btn";

        like.innerHTML =
            '<i class="fa-regular fa-heart"></i> Like';


        const comment =
            document.createElement("button");

        comment.className = "comment-btn";

        comment.innerHTML =
            '<i class="fa-regular fa-comment"></i> Comment';


        const share =
            document.createElement("button");

        share.className = "share-btn";

        share.innerHTML =
            '<i class="fa-solid fa-share"></i> Share';


        actions.appendChild(like);
        actions.appendChild(comment);
        actions.appendChild(share);

        post.appendChild(actions);


        // Comments area
        const comments =
            document.createElement("div");

        comments.className = "comments";


        const commentInput =
            document.createElement("div");

        commentInput.className =
            "comment-input";


        const commentImage =
            document.createElement("img");

        commentImage.src =
            "https://i.pravatar.cc/50?img=12";


        const input =
            document.createElement("input");

        input.placeholder =
            "Write a comment...";


        const send =
            document.createElement("button");

        send.textContent =
            "Send";


        commentInput.appendChild(commentImage);
        commentInput.appendChild(input);
        commentInput.appendChild(send);

        comments.appendChild(commentInput);

        post.appendChild(comments);


        // Add post to feed
        const home =
            document.getElementById("homeSection");

        const createBox =
            document.querySelector(".create-post");


        if (home && createBox) {

            home.insertBefore(
                post,
                createBox.nextElementSibling
            );

        }


        // Activate new buttons
        activateLikeButton(like);

        activateShareButton(share);

        comment.addEventListener("click", function() {
            input.focus();
        });

        activateCommentBox(commentInput);


        // Clear fields
        document.getElementById("newPostText").value = "";

        document.getElementById("newImageURL").value = "";


        // Close modal
        closeModal();


        // Increase post count
        const count =
            document.getElementById("postCount");

        if (count) {

            count.textContent =
                Number(count.textContent) + 1;

        }

    });

}


// ===============================
// SEARCH
// ===============================

const search =
    document.getElementById("searchInput");


if (search) {

    search.addEventListener("input", function() {

        const searchText =
            this.value.toLowerCase().trim();

        const posts =
            document.querySelectorAll(".post");


        posts.forEach(post => {

            const content =
                post.textContent.toLowerCase();


            if (content.includes(searchText)) {

                post.style.display = "";

            } else {

                post.style.display = "none";

            }

        });

    });

}


// ===============================
// QUICK POST
// ===============================

const quickPost =
    document.getElementById("postInput");


if (quickPost) {

    quickPost.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            openModal();

            const textarea =
                document.getElementById("newPostText");

            textarea.value =
                this.value;

            this.value = "";

        }

    });

}


// ===============================
// EDIT PROFILE
// ===============================

const editProfile =
    document.querySelector(".edit-profile");


if (editProfile) {

    editProfile.addEventListener("click", function() {

        const name =
            prompt("Enter your new display name:");

        if (!name || name.trim() === "") {
            return;
        }


        const newName =
            name.trim();


        const profileName =
            document.querySelector(".large-profile h1");

        if (profileName) {
            profileName.textContent = newName;
        }


        const sidebarName =
            document.querySelector(".profile-card h3");

        if (sidebarName) {
            sidebarName.textContent = newName;
        }

    });

}


// ===============================
// POST OPTIONS
// ===============================

document.querySelectorAll(".more-btn").forEach(button => {

    button.addEventListener("click", function() {

        const choice =
            prompt(
                "POST OPTIONS\n\n" +
                "1 = Save post\n" +
                "2 = Copy link\n" +
                "3 = Cancel"
            );


        if (choice === "1") {

            alert("Post saved! ⭐");

        }


        if (choice === "2") {

            navigator.clipboard.writeText(
                window.location.href
            ).then(() => {

                alert("Post link copied!");

            }).catch(() => {

                alert(
                    "Website link: " +
                    window.location.href
                );

            });

        }

    });

});


// ===============================
// STORIES
// ===============================

document.querySelectorAll(".story").forEach(story => {

    story.addEventListener("click", function() {

        const name =
            this.querySelector("span");


        if (name) {

            alert(
                "Opening " +
                name.textContent +
                "'s story..."
            );

        }

    });

});


// ===============================
// ESCAPE KEY
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ===============================
// START
// ===============================

showSection("home");

console.log(
    "Connect website JavaScript loaded successfully!"
);
// =====================================================
// MESSAGING SYSTEM
// =====================================================

const conversationItems =
    document.querySelectorAll(".conversation-item");

const conversationList =
    document.getElementById("conversationList");

const chatWindow =
    document.getElementById("chatWindow");

const chatUserName =
    document.getElementById("chatUserName");

const chatUserImage =
    document.getElementById("chatUserImage");

const chatMessages =
    document.getElementById("chatMessages");

const messageInput =
    document.getElementById("messageInput");

const sendMessageButton =
    document.getElementById("sendMessage");

const backToMessages =
    document.getElementById("backToMessages");


// Current person
let currentChatPerson = "";


// =====================================================
// OPEN CONVERSATION
// =====================================================

conversationItems.forEach(function(item) {

    item.addEventListener("click", function() {

        const person =
            this.dataset.person;

        const image =
            this.dataset.image;


        currentChatPerson = person;


        // Set person's information
        chatUserName.textContent = person;

        chatUserImage.src = image;


        // Clear previous chat
        chatMessages.innerHTML = "";


        // Add example conversation
        addReceivedMessage(
            getStartingMessage(person)
        );


        // Hide conversation list
        conversationList.classList.add("hidden");


        // Show chat
        chatWindow.classList.remove("hidden");


        // Focus message box
        setTimeout(function() {

            messageInput.focus();

        }, 100);

    });

});


// =====================================================
// STARTING MESSAGES
// =====================================================

function getStartingMessage(person) {

    if (person === "Daniel Williams") {

        return "Hey! How are you?";

    }


    if (person === "Sarah Brown") {

        return "Check out this photo!";

    }


    return "Hello!";

}


// =====================================================
// ADD RECEIVED MESSAGE
// =====================================================

function addReceivedMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "chat-message received";


    const messageText =
        document.createElement("p");

    messageText.textContent = text;


    const time =
        document.createElement("span");

    time.textContent = "Now";


    message.appendChild(messageText);

    message.appendChild(time);


    chatMessages.appendChild(message);


    scrollChatToBottom();

}


// =====================================================
// ADD YOUR MESSAGE
// =====================================================

function addSentMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "chat-message sent";


    const messageText =
        document.createElement("p");

    messageText.textContent = text;


    const time =
        document.createElement("span");

    time.textContent = "Now";


    message.appendChild(messageText);

    message.appendChild(time);


    chatMessages.appendChild(message);


    scrollChatToBottom();

}


// =====================================================
// SEND MESSAGE
// =====================================================

function sendMessage() {

    const text =
        messageInput.value.trim();


    // Don't send empty messages
    if (text === "") {

        return;

    }


    // Add your message
    addSentMessage(text);


    // Clear input
    messageInput.value = "";


    // Focus input again
    messageInput.focus();


    // Simple automatic reply
    setTimeout(function() {

        if (currentChatPerson === "Daniel Williams") {

            addReceivedMessage(
                "I'm doing well! Thanks for asking."
            );

        }

        else if (currentChatPerson === "Sarah Brown") {

            addReceivedMessage(
                "Hope you like the photo!"
            );

        }

    }, 1000);

}


// =====================================================
// SEND BUTTON
// =====================================================

if (sendMessageButton) {

    sendMessageButton.addEventListener(
        "click",
        sendMessage
    );

}


// =====================================================
// ENTER KEY TO SEND
// =====================================================

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// =====================================================
// BACK TO CONVERSATIONS
// =====================================================

if (backToMessages) {

    backToMessages.addEventListener(
        "click",
        function() {

            chatWindow.classList.add("hidden");

            conversationList.classList.remove("hidden");

            currentChatPerson = "";

        }
    );

}


// =====================================================
// SCROLL CHAT
// =====================================================

function scrollChatToBottom() {

    if (chatMessages) {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }

}