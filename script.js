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


// =========================================================================
// 1. FIREBASE CONFIGURATION
// =========================================================================
const firebaseConfig = {
    apiKey: "AIzaSyCTWq_qaW2GVU0dX6YGvdqf8YfpHPigNOE",
    authDomain: "aliportfolio-8dcd0.firebaseapp.com",
    projectId: "aliportfolio-8dcd0",
    storageBucket: "aliportfolio-8dcd0.firebasestorage.app",
    messagingSenderId: "583921466541",
    appId: "1:583921466541:web:7427a2533d2df8c7cb5a24"
};

// Initialize Firebase globally to prevent crashes
if (!window.firebase.apps.length) {
    window.firebase.initializeApp(firebaseConfig);
}
const db = window.firebase.firestore();
const auth = window.firebase.auth(); // Securely connects the Auth engine

// =========================================================================
// 2. THEME SWITCHER & 10-SECOND SECRET DOOR
// =========================================================================
const themeBtn = document.getElementById('theme-toggle-btn');
const loginModal = document.getElementById('secret-login-modal');
const adminPanel = document.getElementById('secret-admin-panel');
let holdTimer;
let holdActive = false;

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        if (!holdActive) document.body.classList.toggle('light-theme');
    });

    const startHold = () => {
        holdActive = false;
        holdTimer = setTimeout(() => {
            holdActive = true;
            if(loginModal) loginModal.style.display = 'flex';
        }, 10000); 
    };

    const endHold = () => clearTimeout(holdTimer);

    themeBtn.addEventListener('mousedown', startHold);
    themeBtn.addEventListener('mouseup', endHold);
    themeBtn.addEventListener('mouseleave', endHold);
    themeBtn.addEventListener('touchstart', startHold);
    themeBtn.addEventListener('touchend', endHold);
}

// --- SECURE LOGIN LOGIC ---
const loginSubmitBtn = document.getElementById('login-submit-btn');

if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents the page from refreshing

        const email = document.getElementById('admin-email').value.trim();
        const pass = document.getElementById('admin-password').value;
        const errorMsg = document.getElementById('login-error'); 
console.log("Attempting login with Email: [" + email + "] and Password: [" + pass + "]");
        if (email === "" || pass === "") {
            alert("Please enter both your email and password.");
            return;
        }

        // Change button text so you know it's working
        loginSubmitBtn.innerText = "Checking...";

        auth.signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                loginSubmitBtn.innerText = "Login"; // Reset button text
                alert("Welcome Admin!");
                
                if (adminPanel) adminPanel.style.display = 'block';
                if (loginModal) loginModal.style.display = 'none';
                if (errorMsg) errorMsg.style.display = 'none';
                
                document.getElementById('admin-password').value = ""; // Clear password
            })
            .catch((error) => {
                loginSubmitBtn.innerText = "Login"; // Reset button text
                if (errorMsg) {
                    errorMsg.style.display = 'block';
                    errorMsg.innerText = "Incorrect email or password.";
                } else {
                    alert("Login Failed: " + error.message);
                }
            });
    });
}

// --- Admin Panel Close Logic ---
const closeAdminBtn = document.getElementById('close-admin-btn');
if (closeAdminBtn && adminPanel) {
    closeAdminBtn.addEventListener('click', () => {
        adminPanel.style.display = 'none';
    });
}

// =========================================================================
// 3. DIGITAL DASHBOARD LOGIC (Add, Render, Delete)
// =========================================================================
const addModal = document.getElementById('admin-add-modal');

window.openAddModal = (sectionName) => {
    document.getElementById('new-section').value = sectionName;
    if(addModal) addModal.style.display = 'flex';
};

window.closeAddModal = () => {
    if(addModal) addModal.style.display = 'none';
    document.getElementById('new-title').value = '';
    document.getElementById('new-sub').value = '';
    document.getElementById('new-url').value = '';
    document.getElementById('new-order').value = '';
};

const saveNewItemBtn = document.getElementById('save-new-item-btn');
if (saveNewItemBtn) {
    saveNewItemBtn.addEventListener('click', async () => {
        const title = document.getElementById('new-title').value;
        const subtitle = document.getElementById('new-sub').value;
        const url = document.getElementById('new-url').value;
        const orderNum = parseInt(document.getElementById('new-order').value) || 99;
        const section = document.getElementById('new-section').value;

        if(!title || !url) { alert("Please enter a Title and URL"); return; }

        try {
            await db.collection("portfolio_items").add({
                title: title,
                subtitle: subtitle,
                url: url,
                section: section,
                orderNum: orderNum
            });
            closeAddModal();
        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save. Check console.");
        }
    });
}

window.deleteItem = async (docId) => {
    if (confirm("Are you sure you want to delete this from your website?")) {
        try {
            await db.collection("portfolio_items").doc(docId).delete();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    }
};

// =========================================================================
// 4. THE LIVE RENDERING ENGINE (Draws Public Site & Intercepts Clicks)
// =========================================================================
function fetchAndRenderEverything() {
    const shortGrid = document.getElementById('firebase-short-form');
    const longGrid = document.getElementById('firebase-long-form');
    const thumbGrid = document.getElementById('firebase-thumbnails');

    const adminShort = document.getElementById('admin-grid-short');
    const adminLong = document.getElementById('admin-grid-long');
    const adminThumb = document.getElementById('admin-grid-thumb');

    if (!shortGrid) return;

    db.collection("portfolio_items").orderBy("orderNum", "asc").onSnapshot((snapshot) => {
        shortGrid.innerHTML = ''; longGrid.innerHTML = ''; thumbGrid.innerHTML = '';cachedPortfolioItems = [];
        
        if(adminShort) adminShort.innerHTML = `<div class="admin-card admin-add-card" onclick="openAddModal('short')"><span style="font-size: 3rem;">+</span><p style="font-size: 0.9rem; margin-top: 10px;">Add Video</p></div>`;
        if(adminLong) adminLong.innerHTML = `<div class="admin-card admin-add-card" onclick="openAddModal('long')"><span style="font-size: 3rem;">+</span><p style="font-size: 0.9rem; margin-top: 10px;">Add Edit</p></div>`;
        if(adminThumb) adminThumb.innerHTML = `<div class="admin-card admin-add-card" onclick="openAddModal('thumb')"><span style="font-size: 3rem;">+</span><p style="font-size: 0.9rem; margin-top: 10px;">Add Thumbnail</p></div>`;

        let shortCount = 0;
        let longCount = 0;
        let thumbCount = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            const docId = doc.id; 
            cachedPortfolioItems.push(data);

            let finalImgUrl = data.url;
            let isYouTube = false;
            let videoId = '';

            if (data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
    isYouTube = true;
    if (data.url.includes('shorts/')) {
        // Handles YouTube Shorts URL strings gracefully
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

            // Draw Admin Cards
            const adminCardHTML = `
                <div class="admin-card">
                    <img src="${finalImgUrl}" class="admin-card-bg" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e'">
                    <button class="admin-delete-btn" onclick="deleteItem('${docId}')">×</button>
                    <div class="admin-card-text">
                        <span>#${data.orderNum}</span>
                        <h4>${data.title}</h4>
                    </div>
                </div>
            `;
            if (data.section === 'short' && adminShort) adminShort.insertAdjacentHTML('afterbegin', adminCardHTML);
            if (data.section === 'long' && adminLong) adminLong.insertAdjacentHTML('afterbegin', adminCardHTML);
            if (data.section === 'thumb' && adminThumb) adminThumb.insertAdjacentHTML('afterbegin', adminCardHTML);

            // Draw Public Cards
            if (data.section === 'thumb') {
    thumbCount++;
    if (thumbCount <= 3) {
        // Added style="cursor: pointer;" and an onclick event pointing to your image zoom modal
        thumbGrid.innerHTML += `
            <div class="card glass reveal active" onclick="document.getElementById('imageModal').style.display='block'; document.getElementById('fullScreenImg').src='${finalImgUrl}'; document.getElementById('fullScreenImg').style.transform='scale(1)';" style="opacity:1; transform:translateY(0); cursor: pointer;">
                <div class="thumbnail-image" style="width:100%; aspect-ratio:16/9; overflow:hidden; border-radius:15px;">
                    <img src="${finalImgUrl}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="card-content">
                    <h3>${data.title}</h3>
                    <p>${data.subtitle}</p>
                </div>
            </div>`;
    }
} else {
                let visualContentHTML = '';
                let cursorStyle = '';

                if (isYouTube) {
                    cursorStyle = 'cursor: pointer;';
                    // We wrap the iframe and place a transparent invisible click-catcher overlay div on top of it.
                    // This lets us detect clicks anywhere on the card, opening it into full screen seamlessly!
                    visualContentHTML = `
                        <div style="position:relative; width:100%; height:100%;">
                            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1" title="${data.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:100%; border-radius:15px; pointer-events: none;"></iframe>
                            <div onclick="openVideoFullscreen('${videoId}')" style="position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:10;"></div>
                        </div>`;
                } else {
                    visualContentHTML = `
                        <div class="card-image" style="background-image: url('${finalImgUrl}'); background-size: cover; background-position: center; width:100%; height:100%;">
                            <div class="glass-play">▶</div>
                        </div>`;
                }

                // Sets a beautiful maximum height constraints so they don't grow too massive on big monitors
let cardBoxStyle = (data.section === 'short') 
    ? 'aspect-ratio: 9/16; max-height: 400px; width: auto; margin: 0 auto;' 
    : 'width: 100%; height: 250px;';

const cardHTML = `
    <div class="card glass reveal active" style="opacity:1; transform:translateY(0); ${cursorStyle} display: flex; flex-direction: column;">
        <div style="${cardBoxStyle} background: rgba(0,0,0,0.6); border-radius: 15px; overflow:hidden;">
            ${visualContentHTML}
        </div>
        <div class="card-content" style="width: 100%; max-width: 225px; margin: 0 auto; text-align: center;">
            <h3>${data.title}</h3>
            <p>${data.subtitle}</p>
        </div>
    </div>`;

                if (data.section === 'short') {
                    shortCount++;
                    if (shortCount <= 3) shortGrid.innerHTML += cardHTML;
                }
                if (data.section === 'long') {
                    longCount++;
                    if (longCount <= 3) longGrid.innerHTML += cardHTML;
                }
            }
        });
    });
}

// Global Arrays to keep track of complete background items
let cachedPortfolioItems = [];

window.openAllVideosPanel = function(sectionType, titleText) {
    const panel = document.getElementById('allVideosPanel');
    const panelGrid = document.getElementById('panelGridContainer');
    const panelTitle = document.getElementById('panelTitle');
    
    if(!panel || !panelGrid) return;
    
    panelTitle.innerText = titleText;
    panelGrid.innerHTML = ''; // Wipe clean
    panelGrid.innerHTML = ''; // Clear layout panel grid
    
    // Filter out only the matching section elements from our live sync database array
    const filtered = cachedPortfolioItems.filter(item => item.section === sectionType);
    
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

// THIS LINE MUST ALWAYS REMAIN THE ABSOLUTE LAST THING IN YOUR FILE
fetchAndRenderEverything();

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