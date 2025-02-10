import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="p-10 bg-primary dark:bg-dark-accent text-accent dark:text-dark-text">

            <section className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img src="/favicon.png" alt="logo" className="h-10 w-10" />
                    <h1 className="text-xl font-semibold">Class<span className="font-semibold text-secondary">Mate</span></h1>
                </div>

                <div className="flex flex-col items-start">
                    <h1 className="text-accent font-semibold">Contact</h1>
                    <p className="font-light"><Link to='' target="_blank">github</Link></p>
                    <p><Link to='' target="_blank">Linkedin</Link></p>
                    <p><Link to='' target="_blank">facebook</Link></p>
                </div>
            </section>
            <hr className="border-b border-accent/50" />

        </footer>
    );
};

export default Footer;