
const textarea =
    document.getElementById("prompt");

const tokenColors = {};

function generateTransparentColor() {

    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.25)`;
}

textarea.addEventListener("input", async () => {

    const text = textarea.value;

    const response = await fetch("/count", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text
        })
    });

    const data = await response.json();

    document.getElementById("charCount").innerText = data.character_count;

    document.getElementById("tokenCount").innerText = data.token_count;

    const tokenContainer = document.getElementById("tokenContainer");

    tokenContainer.innerHTML = "";

    data.tokens.forEach((token, index) => {

        const div =
            document.createElement("div");

        div.className = "token";

        const tokenKey = index;

        if (!tokenColors[tokenKey]) {
            tokenColors[tokenKey] = generateTransparentColor();
        }

        div.style.backgroundColor = tokenColors[tokenKey];

        div.innerHTML = `
                <div class="token-id">
                    ID: ${token.token_id}
                </div>
                <div>${token.token}</div>
            `;

        tokenContainer.appendChild(div);

    });

});