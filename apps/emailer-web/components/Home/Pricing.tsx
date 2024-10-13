"use client";

import Script from "next/script";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function Pricing() {
  const user_id = localStorage.getItem("user_id");
  const { isSignedIn } = useUser();
  const handleGetStartedClick = () => {
    if (!isSignedIn) {
      <RedirectToSignIn />;
    }
  };

  const createOrder = async () => {
    const res = await axios.post("/api/payments/createOrder", {
      amount: 800 * 100,
    });

    const data = res.data;

    const paymentData = {
      key: process.env.RAZORPAY_SECRET_KEY as string,
      order_id: data.id,

      handler: async function (response: any) {
        // verify payment
        const res = await axios.post("/api/payments/verifyOrder", {
          orderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          user_id: user_id,
        });

        const data = res.data;
        console.log(data);
        if (data.isOk) {
          alert("Payment successful");
        } else {
          alert("Payment failed");
        }
      },
    };
    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  };
  return (
    <>
      <section id="pricing" className="pb-20 px-6">
        <Script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-center">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center items-center bg-white md:p-8 p-6 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <h3 className="md:text-2xl text-lg font-bold">Pay As You Go</h3>
                <p className="bg-green-100 text-green-500 p-2 rounded-md font-bold md:text-2xl text-lg text-nowrap">
                  Flexible Plan
                </p>
              </div>
              <ul className="space-y-2 py-6">
                <li className="flex gap-2">
                  <IconCheck className="text-[#27C08D] w-14" />
                  <p>
                    <span className="font-bold">Receive 3000 Tokens:</span> Get
                    3000 tokens to use for generating email MJML-use them at
                    your own pace with no expiration.
                  </p>
                </li>
                <li className="flex gap-2">
                  <IconCheck className="text-[#27C08D] w-14" />
                  <p>
                    <span className="font-bold">
                      No Subscription Required:{" "}
                    </span>
                    Pay once, and use your tokens without any monthly fees or
                    additional costs.
                  </p>
                </li>
              </ul>
              <div>
                <p className="text-xl font-semibold">No Upfront Cost</p>
                <p className="text-center text-4xl py-1 font-bold">₹800</p>
                <p className="text-sm text-center text-gray-700">
                  Pay for what you use
                </p>
              </div>
              <button
                onClick={createOrder}
                className="w-full text-xl font-bold py-2 mt-6 rounded-md bg-[#27C08D] hover:bg-[#27C08D]/90 text-white"
              >
                Get Started
              </button>
            </div>
            <div className="flex flex-col justify-center items-center bg-white md:p-8 p-6 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <h3 className="md:text-2xl text-md font-bold">
                  Unlimited Access
                </h3>
                <p className="bg-blue-100 text-blue-500 p-2 rounded-md font-bold md:text-2xl text-lg text-nowrap">
                  Best Value
                </p>
              </div>
              <ul className="space-y-2 py-6">
                <li className="flex gap-2">
                  <IconCheck className="text-[#27C08D] w-14" />
                  <p>
                    <span className="font-bold">Unlimited Generation: </span>
                    Create as many email HTML files as you need without any
                    additional charges.
                  </p>
                </li>
                <li className="flex gap-2">
                  <IconCheck className="text-[#27C08D] w-14" />
                  <p>
                    <span className="font-bold">One-Time Purchase: </span>
                    ₹1500 to generate beautiful unlimited MJML emails for a
                    month without any additional costs.
                  </p>
                </li>
              </ul>
              <div>
                <p className="text-xl font-semibold">No Upfront Cost</p>
                <p className="text-center text-4xl py-1 font-bold">₹1500</p>
                <p className="text-sm text-center text-gray-700">
                  Pay for what you use
                </p>
              </div>

              <button className="w-full text-xl font-bold py-2 mt-6 rounded-md bg-[#27C08D] hover:bg-[#27C08D]/90 text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
