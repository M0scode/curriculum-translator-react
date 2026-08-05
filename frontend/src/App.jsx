import { useState } from "react";

import "./styles/App.css";

import Header from "./components/Header";
import TextTranslator from "./components/TextTranslator";
import DocumentTranslator from "./components/DocumentTranslator";
import Footer from "./components/Footer";

function App() {

    const [activeTab, setActiveTab] = useState("text");

    return (

        <div className="app-container">

            <Header />

            <div className="tab-container">

                <button

                    className={
                        activeTab === "text"
                            ? "tab active"
                            : "tab"
                    }

                    onClick={() => setActiveTab("text")}

                >

                    ✍ Text Translation

                </button>

                <button

                    className={
                        activeTab === "document"
                            ? "tab active"
                            : "tab"
                    }

                    onClick={() => setActiveTab("document")}

                >

                    📄 Document Translation

                </button>

            </div>

            {

                activeTab === "text"

                    ? <TextTranslator />

                    : <DocumentTranslator />

            }

            <Footer />

        </div>

    );

}

export default App;
