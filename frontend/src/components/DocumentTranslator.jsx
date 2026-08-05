import { useState } from "react";
import "../styles/DocumentTranslator.css";


function DocumentTranslator() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [downloadUrl, setDownloadUrl] = useState(null);


    const translateDocument = async () => {

        if (!file) {

            setMessage(
                "Please select a document first."
            );

            return;

        }


        setLoading(true);
        setMessage("");


        const formData = new FormData();

        formData.append(
            "file",
            file
        );


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/translate-document",
                {
                    method: "POST",
                    body: formData,
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Translation failed"
                );

            }


            const blob =
                await response.blob();


            const url =
                window.URL.createObjectURL(blob);


            setDownloadUrl(url);


            setMessage(
                "✅ Document translated successfully!"
            );


        }
        catch(error){

            setMessage(
                "Unable to translate document."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="document-card">


            <h2>
                📄 Document Translation
            </h2>


            <p>
                Upload your educational document
                and translate it into isiZulu.
            </p>



            <label className="upload-box">


                <input

                    type="file"

                    accept=".docx"

                    onChange={
                        (e)=>
                        setFile(e.target.files[0])
                    }

                />


                <div>

                    📄

                    <h3>
                        Upload Word Document
                    </h3>


                    <span>
                        Click to browse (.docx)
                    </span>


                </div>


            </label>



            {

                file &&

                <p className="selected-file">

                    📘 {file.name}

                </p>

            }



            <button

                className="document-btn"

                onClick={translateDocument}

                disabled={loading}

            >

                {

                    loading

                    ? "⏳ Translating..."

                    : "Translate Document"

                }


            </button>



            {

                message &&

                <p className="document-message">

                    {message}

                </p>

            }



            {

                downloadUrl &&

                <a

                    href={downloadUrl}

                    download="translated_document.docx"

                    className="download-btn"

                >

                    ⬇ Download Translation

                </a>

            }


        </div>

    );

}


export default DocumentTranslator;