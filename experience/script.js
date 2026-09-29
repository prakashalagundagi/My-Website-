$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        const scrollTopButton = document.querySelector('#scroll-top');
        if (scrollTopButton) {
            if(window.scrollY>60){
                scrollTopButton.classList.add('active');
            }else{
                scrollTopButton.classList.remove('active');
            }
        }
    });
});

/* ===== SCROLL REVEAL ANIMATION ===== */
if (window.ScrollReveal) {
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 900,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        reset: false
    });

    /* SCROLL EXPERIENCE */
    srtop.reveal('.experience .timeline',{delay: 400});
    srtop.reveal('.experience .timeline .container',{interval: 180}); 
}

// Start of Tawk.to Live Chat
const isLocalEnvironment = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
if (!isLocalEnvironment) {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        if (s0 && s0.parentNode) {
            s0.parentNode.insertBefore(s1,s0);
        }
    })();
}
// End of Tawk.to Live Chat


// disable developer mode
document.onkeydown = function(e) {
  if(e.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

document.addEventListener('visibilitychange',
function(){
    if(document.visibilityState === "visible"){
        document.title = "Experience | Portfolio Prakash A";
        $("#favicon").attr("href","../assets/images/favicon.png");
    }
    else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href","../assets/images/favhand.png");
    }
});
