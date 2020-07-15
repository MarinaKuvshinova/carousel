const carousel = document.querySelector('.carousel');
const sliders = document.querySelectorAll('.slide');
const btnLeft = document.createElement('button');
const btnRight = document.createElement('button');
let number = 3;

const createGallery = () => {
    const slidersBox = document.createElement('div');
    slidersBox.className = 'sliders';
    const slideset = document.createElement('div');
    slideset.className = 'slideset';
    slideset.style.transform = "translate3d(0, 0, 0)";
    for (let i = 0; i < sliders.length; i++) {
        slideset.appendChild(sliders[i]);
    }
    slidersBox.appendChild(slideset);
    carousel.appendChild(slidersBox);
};
createGallery();

const slideSize = (countSlide) => {
    let count = 1;
    sliders.forEach(elem => {
        elem.style.width = carousel.offsetWidth/countSlide + 'px';
        elem.setAttribute("tabset", count++);
    });
};
slideSize(number);

const createButtons = () => {
    btnLeft.className = 'btn btn_left';
    btnLeft.textContent = '<';

    btnRight.className = 'btn btn_right';
    btnRight.textContent = '>';
    carousel.prepend(btnLeft);
    carousel.append(btnRight);
};
createButtons();

const transformChange = (slideset) => {
    const values = slideset.style.transform.split(/\w+\(|\);?/);
    return values[1].split(/,\s?/g).map(numStr => parseInt(numStr));
};

const slideset = document.querySelector('.slideset');

const handleClick = (value) => {
    const transform = transformChange(slideset);
    slideset.style.transform = `translate3d(${transform[0] + value}px, 0, 0)`;
};
const pagination = () => {
    const countPagination = Math.floor(sliders.length);
    const pagination = document.createElement('ul');
    pagination.className = 'pagination';
    for(let i = 0; i < countPagination; i++)
    {
        const pag = document.createElement('li');
        pag.innerHTML = i + 1;
        if (i === 0) pag.className = "active";

        pag.addEventListener('click', () => {
            document.querySelectorAll(".pagination li").forEach(elem => elem.classList.remove('active'));
            pag.className="active";
            let arrEl = [];
            let count = 0;
            while (+slideset.children[count].getAttribute("tabset") !== i+1) {
                arrEl.push(slideset.children[count]);
                count++;
            }
            handleClick(-carousel.offsetWidth/number*arrEl.length);
            setTimeout(() => {
                slideset.style.transition = 'none';
                slideset.style.transform = 'translate3d(0, 0, 0)';
                arrEl.forEach(elem => {
                    slideset.removeChild(elem);
                    slideset.appendChild(elem);
                });
            },1000);
            slideset.style.transition = 'all 1s';
        });
        pagination.appendChild(pag);
    }
    carousel.appendChild(pagination);
};
pagination();



btnLeft.addEventListener('click', () => {
    const last = slideset.lastChild;
    document.querySelectorAll(".pagination li").forEach(elem => {
        elem.classList.remove('active');
        if (+last.getAttribute("tabset") === +elem.textContent) elem.className = "active";
    });
    slideset.removeChild(last);
    slideset.style.transition = 'none';
    slideset.style.transform = `translate3d(-${carousel.offsetWidth/number}px, 0, 0)`;
    slideset.prepend(last);
    setTimeout(() => {
        slideset.style.transition = 'all 1s';
        handleClick(carousel.offsetWidth/number);
    });
});
btnRight.addEventListener('click', () => {
    handleClick(-carousel.offsetWidth/number);
    const first = slideset.firstChild;
    document.querySelectorAll(".pagination li").forEach(elem => {
        elem.classList.remove('active');
        if (+first.getAttribute("tabset") + 1 === +elem.textContent) elem.className = "active";
    });



    setTimeout(() => {
        slideset.removeChild(first);
        slideset.style.transition = 'none';
        slideset.style.transform = 'translate3d(0, 0, 0)';
        slideset.appendChild(first);
    },2000);
    slideset.style.transition = 'all 1s';

});



let resizeTimeout;
const resizeThrottler = () => {
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            if (window.innerWidth > 1025) {
                number = 3;
                slideSize(number);
            } else if (window.innerWidth <= 480) {
                number = 1;
                slideSize(number);
            } else if (window.innerWidth <= 1024) {
                number = 2;
                slideSize(number);
            }
        }, 66);
    }
};
window.addEventListener("resize", resizeThrottler, false);
window.addEventListener("DOMContentLoaded", resizeThrottler, false);



