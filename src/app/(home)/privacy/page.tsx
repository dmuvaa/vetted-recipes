// File: src/app/privacy/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// /privacy/page.tsx

export default function PrivacyPolicy() {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to Vetted Recipes! Your privacy is very important to us. We strive to maintain the highest standards in respecting your privacy and safeguarding any information when you visit our site. Here’s what you need to know about how we handle your privacy.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">1. No User Accounts or Sign-Ups</h2>
        <p className="mb-4">
          Vetted Recipes does not require or offer any form of user registration, login, or sign-up process. We do not collect, store, or process any personally identifiable information from our users.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">2. Information Collection</h2>
        <p className="mb-4">
          Since we do not have account systems, we do not request, collect, or store any personal information such as names, email addresses, or payment details. Our goal is to provide a seamless, open browsing experience with no need for personal data.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking</h2>
        <p className="mb-4">
          Vetted Recipes does not actively use cookies, tracking scripts, or analytics tools to monitor your activity. However, in the course of general web browsing, your browser may interact with certain web services or plugins on our site, which could involve limited data exchange. None of this data is stored or used by us.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">4. Links to External Sites</h2>
        <p className="mb-4">
          Our website contains links to other sites, including our partner site, <a href="https://definedrecipe.com" className="text-blue-600 hover:text-blue-700 transition">Defined Recipe</a>, which offers custom recipe generation. Please be aware that these sites may have their own privacy practices, and we encourage you to review their policies when visiting them.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
        <p className="mb-4">
          As we continue to improve and update our website, this privacy policy may be revised. We will post updates on this page, so please check back periodically to stay informed of any changes.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions, concerns, or feedback regarding this privacy policy, please feel free to reach out to us through our contact form on the site. We’re here to help and will address any questions as soon as possible.
        </p>
  
        <p className="text-gray-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    );
  }
  