const downloadButton = document.getElementById("download-button");
const abortButton = document.getElementById("abort-button");

let controller;

downloadButton.addEventListener("click", () => {
    controller = new AbortController();

    const request = new Request("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", {
        signal: controller.signal
    });

    fetch(request).then(resp => {
        console.log("resp", resp);
    }).catch(err => {
        console.error("err", err);
    });
});

abortButton.addEventListener("click", () => {
    controller.abort();
});