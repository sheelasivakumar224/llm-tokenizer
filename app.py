from flask import Flask, render_template, request, jsonify

import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/count", methods=["POST"])
def count_tokens():
    data = request.get_json()
    text = data.get("text", "")
    tokens =  enc.encode(text)
    print(tokens)

    token_data = []

    for token in tokens:
        token_data.append({
            "token": enc.decode([token]),
            "token_id" : token
        })

    return jsonify({
        "token_count": len(tokens),
        "tokens": token_data,
        "character_count": len(text)
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port = 5000, debug=False)
