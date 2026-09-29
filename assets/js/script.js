$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        const scrollTopButton = document.querySelector('#scroll-top');
        const header = document.querySelector('header');

        if (scrollTopButton) {
            if (window.scrollY > 60) {
                scrollTopButton.classList.add('active');
            } else {
                scrollTopButton.classList.remove('active');
            }
        }

        if (header) {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]:not([href="#"])').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").on("submit", async function (event) {
        event.preventDefault();

        const form = event.currentTarget;
        const submitButton = form.querySelector('button[type="submit"]');
        const status = document.getElementById("contact-status");
        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone") || "Not provided";
        const message = formData.get("message");

        submitButton.disabled = true;
        status.textContent = "Sending your message...";

        try {
            if (!window.emailjs) {
                throw new Error("Email service is unavailable");
            }

            emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
            await emailjs.sendForm("service_kwmvj2e", "template_swvux8s", form);

            form.reset();
            status.textContent = "Your message was sent successfully.";
        } catch (error) {
            console.error("EmailJS submission failed:", error);
            const subject = encodeURIComponent(`Portfolio contact from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
            );

            status.innerHTML = `
                Email sending is currently unavailable.
                <a href="mailto:prakashalagundagi20@gmail.com?subject=${subject}&body=${body}">
                    Click here to email me directly
                </a>
            `;
        } finally {
            submitButton.disabled = false;
        }
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Prakash A";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
if (window.Typed) {
    var typed = new Typed(".typing-text", {
        strings: ["scalable web apps", "REST APIs", "secure software", "clean user interfaces", "things that solve real problems"],
        loop: true,
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 1200,
        smartBackspace: true,
    });
}
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response;
    type === "skills"
        ? response = await fetch("skills.json")
        : response = await fetch("./projects/projects.json");

    if (!response.ok) {
        throw new Error(`Failed to fetch ${type}: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    // Show only the Portfolio Website project
    let project = projects.find(p => p.name === "Portfolio Website");
    let projectHTML = "";
    if (project) {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    }
    projectsContainer.innerHTML = projectHTML || `<p>No projects found</p>`;

    // <!-- tilt js effect starts -->
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 10,
            speed: 650,
            glare: true,
            "max-glare": 0.18,
        });
    }
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    if (window.ScrollReveal) {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        /* SCROLL PROJECTS */
        srtop.reveal('.work .box', { interval: 200 });
    }

}

fetchData().then(data => {
    showSkills(data);
}).catch(err => console.error("Could not load skills.json:", err));

fetchData("projects").then(data => {
    showProjects(data);
}).catch(err => console.error("Could not load projects.json:", err));

// <!-- tilt js effect starts -->
if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 10,
        speed: 650,
        glare: true,
        "max-glare": 0.18,
    });
}
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
const isLocalEnvironment = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
if (!isLocalEnvironment) {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        if (s0 && s0.parentNode) {
            s0.parentNode.insertBefore(s1, s0);
        }
    })();
}
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
if (window.ScrollReveal) {
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 900,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        reset: false
    });

    /* SCROLL HOME */
    srtop.reveal('.home .content h2', { delay: 120 });
    srtop.reveal('.home .content p', { delay: 220 });
    srtop.reveal('.home .hero-highlights .highlight-item', { interval: 90, delay: 300 });
    srtop.reveal('.home .content .btn', { delay: 420 });

    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .social-icons li', { interval: 90, delay: 420 });

    /* SCROLL ABOUT */
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });


    /* SCROLL SKILLS */
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { interval: 80 });

    /* SCROLL EDUCATION */
    srtop.reveal('.education .box', { interval: 200 });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

    /* SCROLL EXPERIENCE */
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 180 });

    /* SCROLL CONTACT */
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
}
