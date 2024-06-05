import Head from "../../components/Head";

function FQA() {
    return (
        <>
            <div
                className="px-4 mt-5 sm:py-6 mx-auto max-w-screen-md lg:py-4 md:px-6 flex flex-col gap-4">
                <div className="mx-auto w-full">
                    <div className="flex flex-col items-center">
                        <Head h1="Explore" h2="FAQs" />
                    </div>
                    <div className="mx-auto mt-8 grid max-w-full divide-y divide-neutral-200">
                        <div className="py-5">
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                    <span className="text-mynavy"> How does the billing work?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className="group-open:animate-fadeIn mt-3 text-mynavy">PopShop offers a variety of
                                    billing options, including net banking, cash on delivery and UPI.
                                </p>
                            </details>
                        </div>
                        <div className="py-5">
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                    <span className="text-mynavy"> Can I get a refund?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className="group-open:animate-fadeIn mt-3 text-mynavy">We offer a 7-day money-back
                                    guarantee for most of the orders. The refund process usually takes 2 to 3 working days.
                                </p>
                            </details>
                        </div>
                        <div className="py-5">
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                    <span className="text-mynavy"> How do I cancel my order?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className="group-open:animate-fadeIn mt-3 text-mynavy">To cancel your order, you can
                                    log in to your account and navigate to the your orders page. From there, you
                                    should be able to cancel your order.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FQA;
