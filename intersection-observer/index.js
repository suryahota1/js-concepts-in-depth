const oneEle = document.getElementById("one");
const twoEle = document.getElementById("two");
const threeEle = document.getElementById("three");
const fourEle = document.getElementById("four");
const fiveEle = document.getElementById("five");
const sixEle = document.getElementById("six");
const sevenEle = document.getElementById("seven");
const eightEle = document.getElementById("eight");
const nineEle = document.getElementById("nine");

let increasingColor = "rgb(40 40 190 / ratio)";
let decreasingColor = "rgb(190 40 40 / ratio)";
let prevRatio = 0;

function trackColor () {
    const map = new Map();
    return ( targetId, currVal ) => {
        let prevVal = 0;
        if ( map.has(targetId) ) {
            prevVal = map.get(targetId);
        }
        let val;
        if ( currVal > prevVal ) {
            val = increasingColor.replace("ratio", currVal);
        } else {
            val = decreasingColor.replace("ratio", currVal);
        }

        map.set(targetId, currVal);
        return val;
    }
}

const ref = trackColor();

function callBackFn ( entries, observer ) {
    console.log("entries", entries);
    console.log("observer", observer);
    for ( const entry of entries ) {
        targetId = entry.target.getAttribute("id");
        entry.target.style.backgroundColor = ref(targetId, entry.intersectionRatio);
    }
}

const observer = new IntersectionObserver(callBackFn, {
    root: null,
    rootMargin: "20px",
    threshold: [0, 0.1, 0.2, 0.3, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
});

observer.observe(oneEle);
observer.observe(twoEle);
observer.observe(threeEle);
observer.observe(fourEle);
observer.observe(fiveEle);
observer.observe(sixEle);
observer.observe(sevenEle);
observer.observe(eightEle);
observer.observe(nineEle);
