const portfolioItems = [{
    section: "short",
    title: "Short 1",
    subtitle: "",
    url: "https://youtube.com/shorts/PACw2gbx2HU?feature=share",
    orderNum: 1
}, {
    section: "short",
    title: "Short 2",
    subtitle: "",
    url: "https://youtube.com/shorts/XnhS3voLncQ?feature=share",
    orderNum: 2
}, {
    section: "short",
    title: "Short 3",
    subtitle: "",
    url: "https://youtube.com/shorts/F2yge-ccCOg?feature=share",
    orderNum: 3
}, {
    section: "long",
    title: "Long 1",
    subtitle: "",
    url: "https://youtu.be/Gw9y4TT5Y-w",
    orderNum: 1
}, {
    section: "long",
    title: "Long 2",
    subtitle: "",
    url: "https://youtu.be/eICJNeKtuTM",
    orderNum: 2
}, {
    section: "long",
    title: "Long 3",
    subtitle: "",
    url: "https://youtu.be/FjC6p8rQqQ4",
    orderNum: 3
}, {
    section: "long",
    title: "Long 4",
    subtitle: "",
    url: "https://youtu.be/BEIJgcfX9DM",
    orderNum: 4
}, {
    section: "thumb",
    title: "Thumbnail 1",
    subtitle: "",
    url: "https://github.com/muhammadali151/my-portfolio-images/blob/main/images/ChatGPT%20Image%20May%2013,%202026,%2011_50_26%20AM.png?raw=true",
    orderNum: 1
}, {
    section: "thumb",
    title: "Thumbnail 2",
    subtitle: "",
    url: "https://github.com/muhammadali151/my-portfolio-images/blob/main/images/ChatGPT%20Image%20May%2013,%202026,%2012_26_08%20PM.png?raw=true",
    orderNum: 2
}, {
    section: "thumb",
    title: "Thumbnail 3",
    subtitle: "",
    url: "https://github.com/muhammadali151/my-portfolio-images/blob/main/images/Russia%20facts.png?raw=true",
    orderNum: 3
}];

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== Custom Cursor - FULL WEBSITE =====
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    // Track mouse position
    let mouseX = 0,
        mouseY = 0;
    let followerX = 0,
        followerY = 0;

    // Update mouse position on move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });

    // Smooth animation for the follower
    function animateFollower() {
        let dx = mouseX - followerX;
        let dy = mouseY - followerY;

        followerX += dx * 0.1;
        followerY += dy * 0.1;

        if (follower) {
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
        }

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Function to expand cursor
    function expandCursor() {
        if (follower) {
            follower.style.width = '70px';
            follower.style.height = '70px';
            follower.style.background = 'rgba(157, 78, 221, 0.15)';
            follower.style.borderColor = 'rgba(157, 78, 221, 0.8)';
            follower.style.borderWidth = '3px';
        }
        if (cursor) {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.background = '#c77dff';
        }
    }

    // Function to shrink cursor back
    function shrinkCursor() {
        if (follower) {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.background = 'transparent';
            follower.style.borderColor = 'rgba(157, 78, 221, 0.5)';
            follower.style.borderWidth = '2px';
        }
        if (cursor) {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.background = 'var(--text-light)';
        }
    }

    // Target EVERYTHING interactive
    const allInteractive = document.querySelectorAll(
        'a, button, .btn, .nav-btn, .graphics-btn, .submit-btn, .btn-text, ' +
        '.panel-close-btn, .close-modal, #closeVideoModal, .menu-toggle, ' +
        '.card, .work-card, .service-card, .graphics-card, ' +
        'img, video, iframe, .thumbnail-image, .card-image, .profile-pic, ' +
        '.play-button-pulse, .nav-links a, .logo, .round-contact-btn, ' +
        '[onclick], [role="button"]'
    );

    // Add hover effects to everything
    allInteractive.forEach(el => {
        el.addEventListener('mouseenter', expandCursor);
        el.addEventListener('mouseleave', shrinkCursor);
    });

    // Also watch for dynamically added elements
    const observer = new MutationObserver(() => {
        const newElements = document.querySelectorAll(
            'img, video, iframe, .card, .work-card, .thumbnail-image'
        );
        newElements.forEach(el => {
            if (!el._cursorAdded) {
                el._cursorAdded = true;
                el.addEventListener('mouseenter', expandCursor);
                el.addEventListener('mouseleave', shrinkCursor);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // ===== Scroll Reveal =====
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // ===== Mobile Menu =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
    }

    // ===== Image Modal =====
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullScreenImg');
    const closeModal = document.querySelector('.close-modal');
    let scale = 1;

    window.openImageModal = function(src) {
        if (modal && modalImg) {
            modal.style.display = 'block';
            modalImg.src = src;
            scale = 1;
            modalImg.style.transform = `scale(${scale})`;
            const panel = document.getElementById('allVideosPanel');
            if (!panel || panel.style.display !== 'block') {
                document.body.style.overflow = 'hidden';
            }
        }
    };

    function closeImageModal() {
        if (modal) {
            modal.style.display = 'none';
            const panel = document.getElementById('allVideosPanel');
            if (!panel || panel.style.display !== 'block') {
                document.body.style.overflow = '';
            }
        }
    }

    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            e.stopPropagation();
            closeImageModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeImageModal();
        });
    }

    if (modalImg) {
        modalImg.addEventListener('wheel', function(event) {
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

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (videoModal && videoModal.style.display === 'flex') {
                window.closeVideoFullscreen();
            } else if (modal && modal.style.display === 'block') {
                closeImageModal();
            } else {
                closeAllVideosPanel();
            }
        }
    });

    // Click on profile pic to open modal
    const profilePic = document.getElementById('profilePic');
    if (profilePic) {
        profilePic.addEventListener('click', function() {
            window.openImageModal(this.src);
        });
    }

    // ===== Video Lightbox =====
    let videoModal = document.getElementById('videoLightboxModal');
    if (!videoModal) {
        const modalHTML = `
            <div id="videoLightboxModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; justify-content:center; align-items:center;">
                <span id="closeVideoModal" style="position:absolute; top:20px; right:35px; color:#fff; font-size:40px; font-weight:bold; cursor:pointer; user-select:none; z-index:100000;">&times;</span>
                <div style="width:85%; max-width:1000px; aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden; box-shadow:0 0 30px rgba(157,78,221,0.3);">
                    <iframe id="lightboxPlayer" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:100%;"></iframe>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        videoModal = document.getElementById('videoLightboxModal');
    }

    window.openVideoFullscreen = function(videoId) {
        const player = document.getElementById('lightboxPlayer');
        if (videoModal && player) {
            player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            videoModal.style.display = 'flex';
            const panel = document.getElementById('allVideosPanel');
            if (!panel || panel.style.display !== 'block') {
                document.body.style.overflow = 'hidden';
            }
        }
    };

    window.closeVideoFullscreen = function() {
        const player = document.getElementById('lightboxPlayer');
        if (videoModal && player) {
            player.src = '';
            videoModal.style.display = 'none';
            const panel = document.getElementById('allVideosPanel');
            if (!panel || panel.style.display !== 'block') {
                document.body.style.overflow = '';
            }
        }
    };

    const closeVideoBtn = document.getElementById('closeVideoModal');
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            window.closeVideoFullscreen();
        });
    }
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) window.closeVideoFullscreen();
        });
    }

    // ===== Render Portfolio =====
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
                    } else if (data.url.includes("v=")) {
                        videoId = data.url.split("v=")[1].split("&")[0];
                    } else if (data.url.includes("youtu.be/")) {
                        videoId = data.url.split("youtu.be/")[1].split("?")[0];
                    }
                    finalImgUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }

                // ---------- THUMBNAILS ----------
if (data.section === "thumb") {
    thumbCount++;
    if (thumbCount <= 6) {
        thumbGrid.innerHTML += `
            <div class="card glass reveal active" style="cursor:pointer;">
                <div class="thumbnail-image" onclick="event.stopPropagation(); openImageModal('${finalImgUrl}')" style="cursor:pointer;">
                    <img src="${finalImgUrl}" alt="${data.title}" loading="lazy" style="pointer-events:none;">
                </div>
                <div class="card-content" style="pointer-events:none;">
                    <h3>${data.title}</h3>
                    <p>${data.subtitle}</p>
                </div>
            </div>`;
    }
    return;
}

                // ---------- SHORT/LONG VIDEOS ----------
                const isShort = data.section === "short";
                const card = `
                    <div class="card glass reveal active">
                        <div style="${isShort ? "aspect-ratio:9/16; width:auto; max-width:280px; max-height:500px; margin:0 auto;" : "width:100%; aspect-ratio:16/9; max-height:320px;"} overflow:hidden;border-radius:15px;position:relative; background:#000;">
                            ${isYouTube ? `
                                <img src="${finalImgUrl}" alt="${data.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
                                <div class="grid-play-overlay" onclick="event.stopPropagation(); openVideoFullscreen('${videoId}')">
                                    <span class="grid-play-icon">▶</span>
                                </div>
                            ` : `
                                <img src="${finalImgUrl}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                            `}
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

    // ===== All Videos Panel =====
window.openAllVideosPanel = function(sectionType, titleText) {
    const panel = document.getElementById('allVideosPanel');
    const panelGrid = document.getElementById('panelGridContainer');
    const panelTitle = document.getElementById('panelTitle');

    if (!panel || !panelGrid || !panelTitle) return;

    panelTitle.innerText = titleText;
    panelGrid.innerHTML = '';

    const filtered = portfolioItems.filter(item => item.section === sectionType);

    if (filtered.length === 0) {
        panelGrid.innerHTML =
            `<p style="color:var(--text-gray); grid-column:1/-1; text-align:center;">No items found in this category.</p>`;
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
            finalImgUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        let visualContentHTML = '';
        let panelCardHeightStyle = '';

        if (sectionType === 'short') {
            panelCardHeightStyle = 'aspect-ratio: 9/16; max-height: 600px; width: auto; max-width: 280px; margin: 0 auto;';
            visualContentHTML = `
                <div style="position:relative; width:100%; height:100%; border-radius:15px; overflow:hidden;">
                    <img src="${finalImgUrl}" alt="${data.title}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                    <div class="grid-play-overlay" onclick="event.stopPropagation(); openVideoFullscreen('${videoId}')">
                        <span class="grid-play-icon">▶</span>
                    </div>
                </div>`;
        } else if (sectionType === 'thumb') {
    panelCardHeightStyle = 'width: 100%; height: 180px; overflow:hidden; border-radius:15px;';
    visualContentHTML = `
        <img src="${finalImgUrl}" alt="${data.title}" 
             style="width:100%; height:100%; object-fit:cover; display:block; cursor:pointer;" 
             onclick="event.stopPropagation(); openImageModal('${finalImgUrl}');">
    `;
} else {
            panelCardHeightStyle = 'width: 100%; height: 200px; overflow:hidden; border-radius:15px;';
            if (isYouTube) {
                visualContentHTML = `
                    <div style="position:relative; width:100%; height:100%;">
                        <img src="${finalImgUrl}" alt="${data.title}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                        <div class="grid-play-overlay" onclick="event.stopPropagation(); openVideoFullscreen('${videoId}')">
                            <span class="grid-play-icon">▶</span>
                        </div>
                    </div>`;
            } else {
                visualContentHTML = `
                    <img src="${finalImgUrl}" alt="${data.title}" 
                         style="width:100%; height:100%; object-fit:cover; display:block; cursor:pointer;" 
                         onclick="event.stopPropagation(); openImageModal('${finalImgUrl}');">
                `;
            }
        }

        panelGrid.innerHTML += `
            <div class="card glass" style="opacity:1; transform:none; cursor:default; padding:15px;">
                <div style="${panelCardHeightStyle} background:rgba(0,0,0,0.6);">
                    ${visualContentHTML}
                </div>
                <div class="card-content" style="margin-top:12px; pointer-events:none;">
                    <h3 style="font-size:1.1rem;">${data.title}</h3>
                    <p style="font-size:0.9rem; color:var(--text-gray);">${data.subtitle}</p>
                </div>
            </div>`;
    });

    panel.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

    window.closeAllVideosPanel = function() {
        const panel = document.getElementById('allVideosPanel');
        if (panel) {
            panel.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // ===== Contact Form =====
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[type="text"]')?.value.trim() || '';
            const email = contactForm.querySelector('input[type="email"]')?.value.trim() || '';
            const message = contactForm.querySelector('textarea')?.value.trim() || '';

            if (!name || !email || !message) {
                alert("Please fill out all fields before sending!");
                return;
            }

            const yourPhoneNumber = "923095183266";
            const formattedText = `Hello Ali! 👋%0A%0A` +
                `*New Project Inquiry*%0A` +
                `-------------------------%0A` +
                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                `📧 *Email:* ${encodeURIComponent(email)}%0A` +
                `📝 *Message:* ${encodeURIComponent(message)}%0A%0A` +
                `_Sent directly from Ali Graphics Website_`;

            const whatsappUrl = `https://wa.me/${yourPhoneNumber}?text=${formattedText}`;
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    // ===== Phone Number Copy =====
    window.copyPhoneNumber = function(buttonElement) {
        const numberToCopy = "03095183266";

        navigator.clipboard.writeText(numberToCopy).then(() => {
            const toast = buttonElement.querySelector('.copy-toast');
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2000);
            }
        }).catch(() => {
            const input = document.createElement('input');
            input.value = numberToCopy;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            const toast = buttonElement.querySelector('.copy-toast');
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2000);
            }
        });
    };

    // ===== Copyright Year =====
    const yearSpan = document.getElementById("copyrightYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== Initialize =====
    fetchAndRenderEverything();

});
