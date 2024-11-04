import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Script from "next/script";
import { UserDetails } from "@/app/types/types";
import { IconCreditCard, IconMail, IconUser } from "@tabler/icons-react";

interface AccountProps {
  userDetails?: UserDetails | null;
}

export default function Account({ userDetails }: AccountProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    setUserId(id);
  }, []);
  const createOrder = async () => {
    if (!userId) {
      alert("User ID not found. Please sign in.");
      return;
    }

    const res = await axios.post("/api/payments/createOrder", {
      amount: 800 * 100, // amount in paise
    });

    const data = res.data;

    const paymentData = {
      key: process.env.RAZORPAY_SECRET_KEY as string,
      order_id: data.id,

      handler: async function (response: any) {
        // Use toast.promise to handle the verification process
        await toast.promise(
          axios.post("/api/payments/verifyOrder", {
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            user_id: userId,
          }),
          {
            loading: "Verifying payment...",
            success: <b>Payment successful!</b>,
            error: <b>Payment verification failed. Please try again.</b>,
          }
        );
        router.push("/dashboard", { scroll: false });
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  };
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <h1 className="text-3xl font-bold">Account</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Profile Information
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your account details
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:px-6 sm:py-5">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              <IconUser className="w-12 h-12" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">
                {userDetails?.name}
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                <IconMail className="w-4 h-4" />
                <span>{userDetails?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Token Management
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your account tokens
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Available Tokens:</span>
            <span className="text-2xl font-bold text-gray-900">
              {userDetails?.credits_remaining}
            </span>
          </div>
          <button
            onClick={createOrder}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <IconCreditCard className="mr-2 h-5 w-5" />
            Top Up Tokens
          </button>
        </div>
      </div>
    </div>
  );
}
