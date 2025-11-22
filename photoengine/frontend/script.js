const imageInput = document.getElementById("imageInput");
const imageContainer = document.getElementById("imageContainer");
const storyText = document.getElementById("storyText");

let images = [];

imageInput.addEventListener("change", (e) => {
    const files = [...e.target.files];
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        images.push({ url, caption: mockCaption() });
        renderImages();
    });
});

function renderImages() {
    imageContainer.innerHTML = "";
    images.forEach((img, index) => {
        const card = document.createElement("div");
        card.className = "image-card";
        card.draggable = true;
        card.innerHTML = `
            <img src="${img.url}">
            <div class="caption" contenteditable="true">${img.caption}</div>
        `;
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("index", index);
        });
        card.addEventListener("drop", (e) => {
            let from = e.dataTransfer.getData("index");
            let to = index;
            [images[from], images[to]] = [images[to], images[from]];
            renderImages();
        });
        card.addEventListener("dragover", (e) => e.preventDefault());
        imageContainer.appendChild(card);
    });
}

document.getElementById("generateBtn").addEventListener("click", () => {
    let captions = document.querySelectorAll(".caption");
    captions.forEach((cap, i) => { images[i].caption = cap.innerText; });

    const story = images
        .map((img, i) => `Picture ${i+1}: ${img.caption}`)
        .join(". ");

    storyText.innerText = story || "Upload images first!";
});

// MOCK CAPTIONS (replace with AI Model later)
function mockCaption() {
    const samples = [
        "A beautiful moment captured",
        "Something interesting happening here",
        "A memory worth telling",
        "A fun scene unfolds"
    ];
    return samples[Math.floor(Math.random() * samples.length)];
}
