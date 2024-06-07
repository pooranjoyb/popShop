import { useState } from "react";
import Head from "../../components/Head";
import Button from "../../components/Button";

import {useNavigate} from 'react-router-dom'

import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";



function Checkout() {
    const[paymentOption,setPaymentOption]=useState("")
    const navigate=useNavigate()
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:py-12 flex justify-between items-center mt-6">
                <Head h1="Check" h2="out" />
            </div>
            <div className="mx-auto max-w-screen-xl px-4 flex pb-8 flex-col-reverse md:flex-row lg:flex-row">
                <div className="w-full sm:w-full md:w-7/12 lg:w-3/4 pe-0 md:pe-12 lg:pe-12 box-content">
                    <h2 className="w-full border-b-2 border-[#c4c4c4] pb-3 pt-4 xl:pt-1 bg-grey-900 mb-2 text-xl font-bold dark:text-gray-400">
                        Payment Option
                    </h2>
                    <h3 className="font-bold text-slate-500 opacity-75 py-5">Select your preferred payment method. Kindly note that paid license are not refundable</h3>
                    <div className="w-full flex flex-col gap-5">
                        <div className={`w-full flex ps-4 py-2 border-2 border-solid ${paymentOption=='credit-card'?" border-[#0000FF] bg-[#0000FF06]":" border-[#C4C4C4]"} rounded-xl`}>
                            <input id="credit-card-radio" name="payment-option" type="radio" value="credit-card" className="my-5 radio radio-primary" checked={paymentOption==="credit-card"?true:false} onChange={(e)=>{
                                setPaymentOption(e.target.value)
                            }} />
                            <label htmlFor="credit-card-radio" className="w-full py-4 ms-4">
                                <h2 className="w-full font-bold dark:text-gray-400">Pay with Credit Card</h2>
                                <div className="w-full my-3 flex flex-wrap gap-2 mt-6">
                                    <RiVisaLine style={{ color: "navy", backgroundColor: "white" }} className="text-3xl box-content py-1 px-3 border border-[#000000] rounded" />
                                    <FaCcMastercard style={{ color: "red", backgroundColor: "white" }} className="text-3xl box-content py-1 px-3 border border-[#000000] rounded" />
                                    <FaPaypal style={{ color: "navy", backgroundColor: "white" }} className="text-3xl box-content py-1 px-3 border border-[#000000] rounded" />
                                    <SiAmericanexpress style={{ color: "blueviolet", backgroundColor: "white" }} className="text-3xl box-content py-1 px-3 border border-[#000000] rounded" />
                                </div>
                                <p className="mt-6 pe-5">You will be redirected to a secure payment page. Please note that direct credit card payment is not supported in all countries. If unavailable, you may need a PayPal account to proceed with the payment.</p>
                            </label>
                        </div>
                        <div className={`w-full flex ps-4 py-2 border-2 border-solid ${paymentOption=='fund-transfer'?" border-[#0000FF] bg-[#0000FF06]":" border-[#C4C4C4]"}  rounded-xl`}>
                            <input id="fund-transfer-radio" name="payment-option" type="radio" value="fund-transfer" className="my-5 radio radio-primary" checked={paymentOption==="fund-transfer"?true:false} onChange={(e)=>{
                                setPaymentOption(e.target.value)
                            }}/>
                            <label htmlFor="fund-transfer-radio" className="w-full py-4 ms-4">
                                <h2 className="w-full font-bold dark:text-gray-400 pe-3">Pay with Fund Transfer via Invoice</h2>
                                <p className="mt-6 pe-5">Invoice of your order will be emailed to <span className="font-medium">contact@popshop.com</span></p>
                                <div className="flex border-2 items-start border-[#c4c4c4] me-4 py-5 font-medium opacity-75 px-2 rounded-lg mt-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span className="mx-2 text-sm" >We'll send important emails to this address, please make sure that the emails don't get stuck in your SPAM folder.</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="w-full mt-8 flex justify-end gap-4">
                        <Button text="Back" color="myred" hover="myred" onClick={()=>{navigate('/home/shop/cart')}} />
                        <Button text="Place Order" color="myyellow" hover="mygreen" />
                    </div>
                </div>
                <div className="w-full md:border-s-2 lg:border-s-2 border-[#c4c4c4] sm:w-full md:w-4/12 lg:w-1/4 ps-0 md:ps-8 lg:ps-8 mt-8 md:mt-0 lg:md-0">
                    <h2 className="w-full pb-3 pt-4 xl:pt-1 bg-grey-900 mb-2 text-xl font-bold dark:text-gray-400">
                        ORDER SUMMARY
                    </h2>
                    <div className="w-full">
                        <div className="product pe-4 my-5 w-full">
                            <p className="font-medium">Twinmotion Bundle</p>
                            <p className="font-medium py-1">$300.00</p>
                            <div className="w-full justify-between flex">
                                <span>Qty</span>
                                <span>20</span>
                            </div>
                            <div className="w-full justify-between flex ">
                                <span>Sub-total</span>
                                <span>$6000.00</span>
                            </div>
                        </div>
                        <div className="product pe-4 my-5 w-full">
                            <p className="font-medium">Twinmotion Bundle</p>
                            <p className="font-medium py-1">$300.00</p>
                            <div className="w-full justify-between flex">
                                <span>Qty</span>
                                <span>20</span>
                            </div>
                            <div className="w-full justify-between flex ">
                                <span>Sub-total</span>
                                <span>$6000.00</span>
                            </div>
                        </div>
                        <div className="product pe-4 my-5 w-full">
                            <p className="font-medium">Twinmotion Bundle</p>
                            <p className="font-medium py-1">$300.00</p>
                            <div className="w-full justify-between flex">
                                <span>Qty</span>
                                <span>20</span>
                            </div>
                            <div className="w-full justify-between flex ">
                                <span>Sub-total</span>
                                <span>$6000.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-t border-[#c4c4c4] py-4">
                        <div className="w-full justify-between flex">
                            <span>Tax(5%)</span>
                            <span>$4000.00</span>
                        </div>
                        <div className="w-full justify-between py-3 flex">
                            <span className="text-xl font-medium">Total</span>
                            <span className="text-xl font-bold">$4000.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;