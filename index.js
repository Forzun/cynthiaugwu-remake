const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout; 

function firstPageAnimation(){
    var tl = gsap.timeline(); 
    
    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5, 
        ease: Expo.easeInOut 
    })

    .to(".boundingelem", {
        y: "0",
        ease: Expo.easeInOut, 
        duration: 2, 
        delay: -1, 
        stagger: .2 
    })

    .from("#herofooter" ,{
        y:-20, 
        opacity: 0,
        duration:2,
        delay: -1, 
        ease:Expo.easeInOut
})

}

function mouseskew(){
    var xscale = 1;
    var yscale = 1; 

    var xprev = 0;
    var yprev = 0;  

    window.addEventListener("mousemove", function(detail){
        clearTimeout(timeout); 

        xscale = gsap.utils.clamp(.8,1.2, detail.clientX - xprev); 
        yscale = gsap.utils.clamp(.8,1.2, detail.clientY - yprev); 
             
        xprev = detail.clientX; 
        yprev = detail.clientY; 

        circleMouseFollowe(xscale, yscale); 

        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${detail.clientX}px, ${detail.clientY}px) scale(1 , 1)`;
        }, 100);

    }); 
}

function circleMouseFollowe(xscale, yscale){
    window.addEventListener("mousemove", function(detail){
        document.querySelector("#minicircle").style.transform = `translate(${detail.clientX}px, ${detail.clientY}px) scale(${xscale} , ${yscale})`; 

    })
}

mouseskew(); 
circleMouseFollowe(); 
firstPageAnimation(); 


document.querySelectorAll(".elem")
.forEach(function (elem){

    var rotate = 0; 
    var difrot = 0; 

    elem.addEventListener("mouseleave", function(detail){
        gsap.to(elem.querySelector("img"), {
            opacity:0,
            ease : Power3,
        }); 
    })

    elem.addEventListener("mousemove", function(detail){
        var diff = detail.clientY - elem.getBoundingClientRect().top;

        difrot = detail.clientX - rotate; 
        rotate = detail.clientX; 

        gsap.to(elem.querySelector("img"), {
            opacity:1, 
            ease : Power3,
            top : diff,  
            left : detail.clientX,
            rotate : gsap.utils.clamp(-20 , 20 , difrot * 0.8),
        }); 
    })
})














