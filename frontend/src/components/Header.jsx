import "../styles/Header.css";

function Header() {

    return (

        <header className="hero">

            <div className="hero-content">

                <div className="hero-icon">
                    🌍
                </div>

                <h1>
                    Curriculum Translator
                </h1>

                <p>
                    Break language barriers in education using Artificial Intelligence.
                    Translate English learning material into isiZulu in seconds.
                </p>

                <div className="hero-badges">

                    <span>
                        ⚡ Fast
                    </span>

                    <span>
                        🤖 AI Powered
                    </span>

                    <span>
                        📚 Education
                    </span>

                </div>

            </div>

        </header>

    );

}

export default Header;