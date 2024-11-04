import {
  IconCreditCard,
  IconMail,
  IconCalendar,
  IconUser,
  IconKey,
} from "@tabler/icons-react";

export default function Component() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <h1 className="text-3xl font-bold">Account</h1>

      {/* Profile Information */}
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
              <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                <IconMail className="w-4 h-4" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                <IconCalendar className="w-4 h-4" />
                <span>Joined January 2023</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Free Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Token Management */}
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
            <span className="text-2xl font-bold text-gray-900">295478</span>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            <IconCreditCard className="mr-2 h-5 w-5" />
            Top Up Tokens
          </button>
        </div>
      </div>

      {/* Account Upgrade */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Account Upgrade
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Upgrade your account to use a personal API key
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500 mb-4">
            Upgrading your account allows you to use your own API key without
            any rate limits. If you have any tokens left, they will be used
            first before your personal API key.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            <IconKey className="mr-2 h-5 w-5" />
            Upgrade Account
          </button>
        </div>
      </div>
    </div>
  );
}
