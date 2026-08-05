import { useState } from "react";
import "../styles/TextTranslator.css";

function Translator() {

    const [text, setText] = useState("");
    const [translation, setTranslation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const translateText = async () => {

        if (!text.trim()) {
            setError("Please enter text to translate.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/translate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: text,
                    }),
                }
            );


            if (!response.ok) {
                throw new Error("Translation failed");
            }


            const data = await response.json();

            setTranslation(data.translation);


        } catch (err) {

            setError(
                "Unable to translate. Please check the server."
            );

        } finally {

            setLoading(false);

        }
    };


    const copyTranslation = () => {

        navigator.clipboard.writeText(
            translation
        );

    };


    const clearText = () => {

        setText("");
        setTranslation("");
        setError("");

    };

    return (

        <div className="translator-card">

            <div className="section">

                <div className="label-row">

                    <h2>
                        English Text
                    </h2>

                    <span>
                        {text.length}/5000
                    </span>

                </div>

                <textarea

                    value={text}

                    onChange={(e)=>
                        setText(e.target.value)
                    }

                    placeholder="Enter English text here..."

                    maxLength="5000"

                />

            </div>

            <button

                className="translate-btn"

                onClick={translateText}

                disabled={loading}

            >

                {

                    loading

                    ? "⏳ Translating..."

                    : "Translate"

                }

            </button>

            {

                error &&

                <p className="error">

                    {error}

                </p>

            }

            <div className="section">

                <h2>

                    isiZulu Translation

                </h2>

                <textarea

                    value={translation}

                    readOnly

                    placeholder="Translation will appear here..."

                />

            </div>

            <div className="actions">

                <button

                    onClick={copyTranslation}

                    disabled={!translation}

                >

                    📋 Copy

                </button>

                <button

                    onClick={clearText}

                >

                    🗑 Clear

                </button>

            </div>

        </div>

    );

}

export default Translator;
