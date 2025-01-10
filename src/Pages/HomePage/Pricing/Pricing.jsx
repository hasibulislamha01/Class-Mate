import { Button, Card } from "antd";
import { IoCheckmarkCircleOutline } from "react-icons/io5";


const plans = [
    {
        "planName": "Basic",
        "price": "Free",
        "description": "Perfect for individuals just getting started.",
        "features": [
            "Access to basic features",
            "1 project collaboration",
            "5 GB storage",
            "Community support"
        ]
    },
    {
        "planName": "Standard",
        "price": "$9.99",
        "description": "Ideal for users requiring advanced features.",
        "features": [
            "All Basic features",
            "Unlimited projects",
            "100 GB storage",
            "Priority support",
            // "Customizable themes"
        ]
    },
    // {
    //     "planName": "Team",
    //     "price": "$29.99/month",
    //     "description": "Best for small teams working together.",
    //     "features": [
    //         "All Pro features",
    //         "Team collaboration tools",
    //         "500 GB storage",
    //         "Dedicated account manager",
    //         "Advanced analytics"
    //     ]
    // },
    {
        "planName": "Premium",
        "price": "$29.99",
        "description": "Tailored solutions for large organizations.",
        "features": [
            "All standard features",
            "Unlimited storage",
            "Custom integrations",
            "24/7 premium support",
            // "Onboarding & training"
        ]
    }
]


const Pricing = () => {
    return (
        <section className="min-h-screen my-32 md:my-12 lg:my-0 flex flex-col items-center justify-center gap-10">

            <div className="text-center w-[95%] md:w-[85%] lg:w-[65%] mx-auto space-y-3">
                <h1 className="text-xl xl:text-2xl font-bold">Get The Best Deal</h1>
                <hr className="lg:w-3/5 mx-auto border-b" />
                <p className="pt-3">
                    You get the best pricing for the best courses in our platform. Get a plan and save at least 25% of your resources compared to other platforms.
                </p>
            </div>

            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 place-items-center gap-5">
                {
                    plans?.map((plan, index) =>
                        <Card
                            style={{
                                padding: '0px',
                            }}
                            key={plan.planName}
                            className={`w-full rounded-lg shadow-lg ${index === 1 && 'bg-gradient-to-tl from-[#a1c4fd] to-[#c2e9fb] p-6 rounded-lg shadow-lg'}`}
                        >
                            <div className="space-y-8 lg:space-y-12">

                                <div className={``}>
                                    <h1 className="uppercase text-lg font-bold">{plan.planName}</h1>
                                    <h1 className="text-xl">{plan.price}</h1>
                                </div>

                                <div className="space-y-3">
                                    <p>
                                        {plan.description}
                                    </p>

                                    {/* <ul className="list-none">
                                        {plan.features?.map((feature, index) =>
                                            <li key={index}
                                                className="flex items-center">
                                                <span className="">
                                                    <IoCheckmarkCircleOutline />
                                                </span>
                                                <span className="ml-2">{feature}</span>
                                            </li>
                                        )}
                                    </ul> */}
                                    <div className="">
                                        {plan.features?.map((feature, index) =>
                                            <p key={index}
                                                className="flex items-center ">
                                                <span className="">
                                                    <IoCheckmarkCircleOutline />
                                                </span>
                                                <span className="ml-2">{feature}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-center mt-8">
                                <Button className="rounded-full w-full">Get Started</Button>
                            </div>

                        </Card>
                    )
                }
            </div>

        </section>
    );
};

export default Pricing;