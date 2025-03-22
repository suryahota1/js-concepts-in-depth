const target = document.getElementById("main");

function callback(entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    });
}

const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.5, 1]
});

observer.observe(target);