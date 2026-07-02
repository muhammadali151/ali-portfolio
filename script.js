const portfolioItems = [

{
section:"short",
title:"Short 1",
subtitle:"",
url:"https://youtube.com/shorts/PACw2gbx2HU?feature=share",
orderNum:1
},

{
section:"short",
title:"Short 2",
subtitle:"",
url:"https://youtube.com/shorts/XnhS3voLncQ?feature=share",
orderNum:2
},

{
section:"short",
title:"Short 3",
subtitle:"",
url:"https://youtube.com/shorts/F2yge-ccCOg?feature=share",
orderNum:3
},

{
section:"long",
title:"Long 1",
subtitle:"",
url:"https://youtu.be/Gw9y4TT5Y-w",
orderNum:1
},

{
section:"long",
title:"Long 2",
subtitle:"",
url:"https://youtu.be/eICJNeKtuTM",
orderNum:2
},

{
section:"long",
title:"Long 3",
subtitle:"",
url:"https://youtu.be/FjC6p8rQqQ4",
orderNum:3
},

{
section:"long",
title:"Long 4",
subtitle:"",
url:"https://youtu.be/BEIJgcfX9DM",
orderNum:4
},

{
section:"thumb",
title:"Thumbnail 1",
subtitle:"",
url:"https://github.com/muhammadali151/my-portfolio-images/blob/main/images/ChatGPT%20Image%20May%2013,%202026,%2011_50_26%20AM.png?raw=true",
orderNum:1
},

{
section:"thumb",
title:"Thumbnail 2",
subtitle:"",
url:"https://github.com/muhammadali151/my-portfolio-images/blob/main/images/ChatGPT%20Image%20May%2013,%202026,%2012_26_08%20PM.png?raw=true",
orderNum:2
},

{
    section:"thumb",
    title:"Thumbnail 3",
    subtitle:"",
    url:"https://github.com/muhammadali151/my-portfolio-images/blob/main/images/Russia%20facts.png?raw=true",
    orderNum:3
}


];

// 1. Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .card');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

// Update exact mouse position for the tiny dot
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if(cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

// Smoothly animate the larger circle to follow the dot
function animateFollower() {
    let dx = mouseX - followerX;
    let dy = mouseY - followerY;
    
    followerX += dx * 0.1; // The 0.1 creates the lag/smooth effect
    followerY += dy * 0.1;
    
    if(follower) {
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
    }
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Grow the cursor when hovering over interactive elements
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if(follower) {
            follower.style.width = '70px';
            follower.style.height = '70px';
            follower.style.background = 'rgba(0, 242, 254, 0.15)';
        }
    });
    link.addEventListener('mouseleave', () => {
        if(follower) {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.background = 'transparent';
        }
    });
});

// 2. Scroll Reveal Animations (Modern Scale + Fade)
const reveals = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});

// Trigger hero animation slightly after load
window.onload = () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('active');
        }, 100);
    }
};

// --- Full Screen Image Modal Logic with Zoom ---
const modal = document.getElementById("imageModal");
const profilePic = document.getElementById("profilePic");
const modalImg = document.getElementById("fullScreenImg");
const closeModal = document.querySelector(".close-modal");

let scale = 1; // Starting zoom level

// 1. Open the modal
if (profilePic) {
    profilePic.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src; 
        scale = 1; // Reset zoom every time you open it
        modalImg.style.transform = `scale(${scale})`;
    });
}

// 2. Zoom in and out with the mouse wheel
if (modalImg) {
    modalImg.addEventListener("wheel", function(event) {
        event.preventDefault(); 
        if (event.deltaY < 0) {
            scale += 0.15;
        } else {
            scale -= 0.15;
        }
        scale = Math.min(Math.max(0.5, scale), 4);
        modalImg.style.transform = `scale(${scale})`;
    }, { passive: false }); 
}

// 3. Close the modal when clicking the "X"
if (closeModal) {
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

// 4. Close the modal when clicking the dark background
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// --- NEW: FULL SCREEN VIDEO LIGHTBOX ENGINE ---
// Dynamically creates and injects a video modal if it doesn't exist in HTML
let videoModal = document.getElementById('videoLightboxModal');
if (!videoModal) {
    const modalHTML = `
        <div id="videoLightboxModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; justify-content:center; align-items:center;">
            <span id="closeVideoModal" style="position:absolute; top:20px; right:35px; color:#fff; font-size:40px; font-weight:bold; cursor:pointer; user-select:none; z-index:100000;">&times;</span>
            <div style="width:85%; max-width:1000px; aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden; box-shadow:0 0 30px rgba(0,242,254,0.3);">
                <iframe id="lightboxPlayer" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:100%;"></iframe>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    videoModal = document.getElementById('videoLightboxModal');
}

// Global functions to control the video popup
window.openVideoFullscreen = function(videoId) {
    const player = document.getElementById('lightboxPlayer');
    if (videoModal && player) {
        // Set source with autoplay ON and mute OFF so they can hear it
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.style.display = 'flex';
    }
};

window.closeVideoFullscreen = function() {
    const player = document.getElementById('lightboxPlayer');
    if (videoModal && player) {
        player.src = ''; // Stripping src stops the video background track instantly
        videoModal.style.display = 'none';
    }
};

// Close handlers for video modal
document.getElementById('closeVideoModal').addEventListener('click', window.closeVideoFullscreen);
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) window.closeVideoFullscreen();
});


// Keep all portfolio items available for "View All"


function fetchAndRenderEverything() {

    const shortGrid = document.getElementById("firebase-short-form");
    const longGrid = document.getElementById("firebase-long-form");
    const thumbGrid = document.getElementById("firebase-thumbnails");

    if (!shortGrid || !longGrid || !thumbGrid) return;

    shortGrid.innerHTML = "";
    longGrid.innerHTML = "";
    thumbGrid.innerHTML = "";

    

    let shortCount = 0;
    let longCount = 0;
    let thumbCount = 0;

    portfolioItems
        .sort((a, b) => a.orderNum - b.orderNum)
        .forEach(data => {

            let finalImgUrl = data.url;
            let videoId = "";
            let isYouTube = false;

            if (data.url.includes("youtube.com") || data.url.includes("youtu.be")) {

                isYouTube = true;

                if (data.url.includes("shorts/")) {
                    videoId = data.url.split("shorts/")[1].split("?")[0];
                }
                else if (data.url.includes("v=")) {
                    videoId = data.url.split("v=")[1].split("&")[0];
                }
                else if (data.url.includes("youtu.be/")) {
                    videoId = data.url.split("youtu.be/")[1].split("?")[0];
                }

                finalImgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            }

            // ---------- THUMBNAILS ----------
            if (data.section === "thumb") {

                thumbCount++;

                if (thumbCount <= 6) {

                    thumbGrid.innerHTML += `
                    <div class="card glass reveal active"
                        onclick="document.getElementById('imageModal').style.display='block';
                                 document.getElementById('fullScreenImg').src='${finalImgUrl}';">

                        <div class="thumbnail-image">
                            <img src="${finalImgUrl}" alt="${data.title}">
                        </div>

                        <div class="card-content">
                            <h3>${data.title}</h3>
                            <p>${data.subtitle}</p>
                        </div>

                    </div>`;
                }

                return;
            }

            // ---------- SHORT/LONG VIDEOS ----------

            const card = `
            <div class="card glass reveal active">

                <div style="${
                    data.section === "short"
    ? "aspect-ratio:9/16;width:100%; max-height:500px; "
    : "width:100%; aspect-ratio:16/9; max-height:320px;"
    
                } overflow:hidden;border-radius:15px;position:relative;">

                    ${
                        isYouTube
                        ?
                        `
                        <iframe
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0"
                            frameborder="0"
                            allowfullscreen
                            style="width:100%;height:100%;pointer-events:none;">
                        </iframe>

                        <div
                            onclick="openVideoFullscreen('${videoId}')"
                            style="position:absolute;inset:0;cursor:pointer;">
                        </div>
                        `
                        :
                        `
                        <img src="${finalImgUrl}"
                             style="width:100%;height:100%;object-fit:cover;">
                        `
                    }

                </div>

                <div class="card-content">
                    <h3>${data.title}</h3>
                    <p>${data.subtitle}</p>
                </div>

            </div>`;

            if (data.section === "short") {

                shortCount++;

if (shortCount <= 4) {
    shortGrid.innerHTML += card;
}

            } else {

                longCount++;

if (longCount <= 3) {
    longGrid.innerHTML += card;
}
            }

        });

}

window.openAllVideosPanel = function(sectionType, titleText) {
    const panel = document.getElementById('allVideosPanel');
    const panelGrid = document.getElementById('panelGridContainer');
    const panelTitle = document.getElementById('panelTitle');
    
    if(!panel || !panelGrid) return;
    
    panelTitle.innerText = titleText;
    panelGrid.innerHTML = ''; // Wipe clean
    panelGrid.innerHTML = ''; // Clear layout panel grid
    
    // Filter out only the matching section elements from our live sync database array
   const filtered = portfolioItems.filter(item => item.section === sectionType);
    
    if(filtered.length === 0) {
        panelGrid.innerHTML = `<p style="color:var(--text-gray); grid-column: 1/-1; text-align:center;">No items found in this category.</p>`;
    }
    
    filtered.forEach(data => {
        let finalImgUrl = data.url;
        let isYouTube = false;
        let videoId = '';

        if (data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
            isYouTube = true;
            if (data.url.includes('shorts/')) {
                videoId = data.url.split('shorts/')[1].split('?')[0].split('&')[0];
            } else if (data.url.includes('v=')) {
                videoId = data.url.split('v=')[1].split('&')[0];
            } else if (data.url.includes('youtu.be/')) {
                videoId = data.url.split('youtu.be/')[1].split('?')[0];
            } else if (data.url.includes('embed/')) {
                videoId = data.url.split('embed/')[1].split('?')[0];
            }
            finalImgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }

        function openImageLightbox(img){
    document.getElementById("fullScreenImg").src = img;
    document.getElementById("imageModal").style.display = "block";
}

        let visualContentHTML = '';
        let panelCardHeightStyle = '';
        let onClickAction = '';

        if (sectionType === 'short') {
            panelCardHeightStyle = 'aspect-ratio: 9/16; height: auto;';
            visualContentHTML = `
                <div style="position:relative; width:100%; height:100%;">
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1" frameborder="0" allowfullscreen style="width:100%; height:100%; border-radius:15px; pointer-events: none;"></iframe>
                    <div onclick="openVideoFullscreen('${videoId}')" style="position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:10;"></div>
                </div>`;
        } else if (sectionType === 'thumb') {
            panelCardHeightStyle = 'width: 100%; height: 180px;';
            onClickAction = `onclick="openImageLightbox('${finalImgUrl}')"`;
            visualContentHTML = `
                <div class="card-image" style="background-image: url('${finalImgUrl}'); background-size: cover; background-position: center; width:100%; height:100%;">
                    <div class="glass-play" style="font-size:1.2rem;">🔍</div>
                </div>`;
        } else {
            panelCardHeightStyle = 'width: 100%; height: 200px;';
            visualContentHTML = isYouTube ? `
                <div style="position:relative; width:100%; height:100%;">
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1" frameborder="0" allowfullscreen style="width:100%; height:100%; border-radius:15px; pointer-events: none;"></iframe>
                    <div onclick="openVideoFullscreen('${videoId}')" style="position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:10;"></div>
                </div>` : `
                <div class="card-image" style="background-image: url('${finalImgUrl}'); background-size: cover; background-position: center; width:100%; height:100%;">
                    <div class="glass-play">▶</div>
                </div>`;
        }

        panelGrid.innerHTML += `
            <div class="card glass" ${onClickAction} style="opacity:1; transform:none; cursor: pointer; background:rgba(255,255,255,0.03);">
                <div style="${panelCardHeightStyle} background: rgba(0,0,0,0.6); border-radius: 15px; overflow:hidden;">
                    ${visualContentHTML}
                </div>
                <div class="card-content">
                    <h3>${data.title}</h3>
                    <p>${data.subtitle}</p>
                </div>
            </div>`;
    });
    
    panel.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Stop background page from scrolling
};

window.closeAllVideosPanel = function() {
    const panel = document.getElementById('allVideosPanel');
    if(panel) panel.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
};

// ... (The 3 round buttons / phone copier code sits up here) ...

// =========================================================================
// --- WHATSAPP FORM ROUTING CONTROLLER ---
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-card form") || document.querySelector("form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop the default page reload
            
            // 1. Capture the input values safely
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();

            // 2. Simple verification check
            if (!name || !email || !message) {
                alert("Please fill out all fields before sending!");
                return;
            }

            // 3. Construct your phone link target destination
            const yourPhoneNumber = "923095183266"; // Your WhatsApp number

            // 4. Format a professional template string with clean spacing breaks
            const formattedText = `Hello Ali! 👋%0A%0A` +
                                  `*New Project Inquiry*%0A` +
                                  `-------------------------%0A` +
                                  `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                                  `📧 *Email:* ${encodeURIComponent(email)}%0A` +
                                  `📝 *Message:* ${encodeURIComponent(message)}%0A%0A` +
                                  `_Sent directly from Ali Graphics Website Portfolio_`;

            // 5. Generate the deep link URL string
            const whatsappUrl = `https://wa.me/${yourPhoneNumber}?text=${formattedText}`;

            // 6. Instantly launch it safely in a clean background browser window tab!
            window.open(whatsappUrl, '_blank');
            
            // Clean up the input field boxes for them
            contactForm.reset();
        });
    }
});


// --- PHONE NUMBER AUTOMATED CLIPBOARD COPIER ---
window.copyPhoneNumber = function(buttonElement) {
    const numberToCopy = "03095183266";
    
    // Copy process using browser clipboard API
    navigator.clipboard.writeText(numberToCopy).then(() => {
        const toast = buttonElement.querySelector('.copy-toast');
        const icon = buttonElement.querySelector('.phone-icon');
        
        if (toast && icon) {
            // Show "Copied!" message bubble above button
            toast.style.display = 'block';
            icon.innerText = '✔️'; // Change phone icon to checkmark temporarily
            
            // Revert back to regular layout icon after 2 seconds
            setTimeout(() => {
                toast.style.display = 'none';
                icon.innerText = '📞';
            }, 2000);
        }
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
};

// Initialize rendering instantly
fetchAndRenderEverything();

// Auto-update copyright year
document.getElementById("copyrightYear").textContent = new Date().getFullYear();
