import { RiFacebookCircleLine, RiInstagramLine, RiYoutubeLine } from "react-icons/ri";


const Footer = () => {
    return (
        <footer className="p-10 bg-primary dark:bg-dark-accent text-accent dark:text-dark-text">

            <section className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <img src="/favicon.png" alt="logo" className="h-10 w-10" />
                    <h1 className="text-xl font-semibold">Class<span className="font-semibold text-secondary">Mate</span></h1>
                </div>

                <button className="bg-secondary text-black py-1 px-4 rounded-full font-medium hover:scale-95 transition-all duration-200">Get in touch</button>
            </section>
            <hr className="mt-4 border-b border-accent/50" />

            <section className="my-12 grid grid-cols-4">

                <div>
                    <h4 className="font-bold mb-2">Address</h4>
                    <div className="text-sm font-light  space-y-1">
                        <p>6206, Rajshahi City, <br /> Rajshahi,  Bangladesh.</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold  mb-2">Contact Us</h4>
                    <div className="text-sm font-light mb-2 space-y-1">
                        <p>+880 1754 XXX</p>
                        <p>help@classmate.com</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Services</h4>
                    <div className="text-sm font-light space-y-1">
                        <p className="text-sm font-light">Consultation</p>
                        <p className="text-sm font-light">Career Guide</p>
                        <p className="text-sm font-light">Formal Exams support</p>
                        <p className="text-sm font-light">Technical issue</p>
                        <p className="text-sm font-light">Admission support</p>
                    </div>
                </div>

                <div>
                    <h1 className="font-bold mb-2">Social</h1>

                    <div className="flex items-center gap-5">
                        <RiFacebookCircleLine size={20}/>
                        <RiInstagramLine size={20} />
                        <RiYoutubeLine size={20} />
                    </div>
                </div>
            </section>

        </footer>
    );
};

export default Footer;