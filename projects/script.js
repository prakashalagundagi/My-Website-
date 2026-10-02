$(document).ready(function () {

    // ================================
    // MOBILE MENU
    // ================================

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });


    // ================================
    // SCROLL
    // ================================

    $(window).on('scroll load', function () {

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        const scrollTopButton = document.querySelector('#scroll-top');

        if (scrollTopButton) {
            if (window.scrollY > 60) {
                scrollTopButton.classList.add('active');
            } else {
                scrollTopButton.classList.remove('active');
            }
        }

    });

});


// ================================
// PAGE TITLE & FAVICON
// ================================

document.addEventListener('visibilitychange', function () {

    if (document.visibilityState === "visible") {

        document.title = "Projects | Portfolio Prakash A";

        $("#favicon").attr(
            "href",
            "../assets/images/favicon.png"
        );

    } else {

        document.title = "Come Back To Portfolio";

        $("#favicon").attr(
            "href",
            "../assets/images/favhand.png"
        );

    }

});


// ================================
// GET PROJECTS
// ================================

function getProjects() {

    return fetch("projects.json")
        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Could not load projects.json"
                );
            }

            return response.json();

        });

}


// ================================
// SHOW PROJECTS
// ================================

function showProjects(projects) {

    const projectsContainer =
        document.querySelector(".work .box-container");

    if (!projectsContainer) {
        console.error(
            "Project container not found."
        );
        return;
    }


    let projectsHTML = "";


    // Display projects
    projects.forEach(project => {

        projectsHTML += `

        <div class="grid-item ${project.category}">

            <div class="box tilt" style="width: 380px; margin: 1rem">

                <img
                    draggable="false"
                    src="../assets/images/projects/${project.image}.png"
                    alt="${project.name}"
                />

                <div class="content">

                    <div class="tag">

                        <h3>${project.name}</h3>

                    </div>

                    <div class="desc">

                        <p>${project.desc}</p>

                        <div class="btns">

                            <a
                                href="${project.links.view}"
                                class="btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fas fa-eye"></i>
                                View
                            </a>

                            <a
                                href="${project.links.code}"
                                class="btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Code
                                <i class="fas fa-code"></i>
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        `;

    });


    // Add projects to page
    projectsContainer.innerHTML =
        projectsHTML || "<p>No projects found</p>";


    // ================================
    // VANILLA TILT
    // ================================

    if (window.VanillaTilt) {

        VanillaTilt.init(
            document.querySelectorAll(".tilt"),
            {
                max: 10,
                speed: 650,
                glare: true,
                "max-glare": 0.18
            }
        );

    }


    // ================================
    // SCROLL REVEAL
    // ================================

    if (window.ScrollReveal) {

        ScrollReveal({
            origin: "bottom",
            distance: "55px",
            duration: 850,
            easing: "cubic-bezier(.2,.8,.2,1)",
            reset: false
        }).reveal(
            ".work .grid-item",
            {
                interval: 70
            }
        );

    }


    // ================================
    // ISOTOPE
    // ================================

    const $grid = $(".box-container").isotope({

        itemSelector: ".grid-item",

        layoutMode: "fitRows"

    });


    // ================================
    // FILTER BUTTONS
    // ================================

    $(".button-group").on(
        "click",
        "button",
        function () {

            $(".button-group")
                .find(".is-checked")
                .removeClass("is-checked");

            $(this).addClass("is-checked");

            const filterValue =
                $(this).attr("data-filter");

            $grid.isotope({
                filter: filterValue
            });

        }
    );

}


// ================================
// LOAD PROJECTS
// ================================

getProjects()

    .then(data => {

        console.log(
            "Projects loaded:",
            data
        );

        showProjects(data);

    })

    .catch(error => {

        console.error(
            "Error loading projects:",
            error
        );

    });


// ================================
// TAWK.TO LIVE CHAT
// ================================

const isLocalEnvironment = [
    "localhost",
    "127.0.0.1",
    ""
].includes(window.location.hostname);


if (!isLocalEnvironment) {

    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {

        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];

        s1.async = true;

        s1.src =
            "https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6";

        s1.charset = "UTF-8";

        s1.setAttribute(
            "crossorigin",
            "*"
        );

        if (s0 && s0.parentNode) {

            s0.parentNode.insertBefore(
                s1,
                s0
            );

        }

    })();

}


// ================================
// DISABLE DEVELOPER SHORTCUTS
// ================================

document.onkeydown = function (e) {

    // F12
    if (e.keyCode === 123) {
        return false;
    }

    // Ctrl + Shift + I
    if (
        e.ctrlKey &&
        e.shiftKey &&
        e.keyCode === "I".charCodeAt(0)
    ) {
        return false;
    }

    // Ctrl + Shift + C
    if (
        e.ctrlKey &&
        e.shiftKey &&
        e.keyCode === "C".charCodeAt(0)
    ) {
        return false;
    }

    // Ctrl + Shift + J
    if (
        e.ctrlKey &&
        e.shiftKey &&
        e.keyCode === "J".charCodeAt(0)
    ) {
        return false;
    }

    // Ctrl + U
    if (
        e.ctrlKey &&
        e.keyCode === "U".charCodeAt(0)
    ) {
        return false;
    }

};