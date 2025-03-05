
export function About() {
    return (
        <section className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
            </div>

            <div className="about-content">
                <p className="about-intro">
                    AppsUs is your all-in-one productivity suite, seamlessly bringing together essential digital tools in a single, intuitive platform.
                </p>

                <div className="about-services">
                    <div className="service-card">
                        <div className="service-icon mail-icon">
                            <img src='assets\css\img\email.png' alt=""></img>
                        </div>
                        <h3>AppsUs Mail</h3>
                        <p>A streamlined email client that helps you stay on top of your communications with a clean, efficient interface.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon keep-icon">
                            <img src='assets\css\img\notes.png' alt=""></img>
                        </div>
                        <h3>AppsUs Keep</h3>
                        <p>A versatile note-taking tool for capturing your thoughts, creating to-do lists, saving images, and organizing your ideas.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon books-icon">
                            <img src='assets\css\img\books.png' alt=""></img>
                        </div>
                        <h3>AppsUs Books</h3>
                        <p>A personal library manager that lets you discover, organize, and keep track of your reading collection.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}