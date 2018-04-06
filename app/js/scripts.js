document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.querySelector('.hamClick');
    const portfolio = document.querySelectorAll('.portfolioContent');
    const contentFade = document.querySelector('.contentFade');

    // ### CHECK BROWSER TYPE ###
    function checkBrowser() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                return 'chrome';
            } else {
                return 'other'
            }
        }
    }
    // ### END ###

    // ### BLUR EFFECT ###
    function elementBlur() {
        const contentEl = document.querySelectorAll('.blurEffect');
        contentEl.forEach(element => element.addEventListener('mouseenter', function () {
            contentEl.forEach(el => el.style.filter = 'blur(3px)');
            element.style.filter = 'none';
        }));
        contentEl.forEach(element => element.addEventListener('mouseleave', function () {
            contentEl.forEach(el => el.style.filter = 'none');
        }));
    }
    elementBlur();
    // ### END ###

    // ### HAMBURGER ###
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (checkBrowser() === 'chrome') {
            if (document.activeElement !== hamburger) {
                hamburger.classList.remove('active');
            }
        }
        else {
            if (e.offsetY > 75) {
                hamburger.classList.remove('active');
            }
        }
    });
    // ### END ###

    // ### FADE IN/FADE OUT ###
    portfolio.forEach(link => link.addEventListener('click', function () {
        portfolio.forEach(element => element.classList.remove('sidebar-navigation--link__active'));
        link.classList.add('sidebar-navigation--link__active');
        for (let i=0; i < portfolio.length; i++) {
            if(portfolio[i] === link) {
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        const _this = this;
                        contentFade.style.opacity = 0;
                        contentFade.addEventListener('transitionend', function(event) {
                            if(event.target !== contentFade) return;
                            contentFade.innerHTML = _this.responseText;
                            contentFade.style.opacity = 1;
                            elementBlur();
                        });
                    }
                };
                xhttp.open("GET", `ajax${i}.html`, true);
                xhttp.send();
            }
        }
    }));
    // ### END ###

    // ### ZENSCROLL DEFAULT DURATION AND OFFSET ###
    zenscroll.setup(777, 0);
    // ### END ###


});