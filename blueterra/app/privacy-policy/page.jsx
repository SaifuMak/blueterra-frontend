

import { rubik, playfair } from "@/app/fonts"
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

export const metadata = {
    title: "Privacy Policy | BlueTerra",
    description: "Read Blue Terra's privacy policy to learn how we collect, use, and protect your personal information in compliance with UAE regulations."
};

export default function PrivacyPolicy() {

    return (

            <>
                <Navbar />
                <div className={`lg:max-w-9/12 mx-auto text-dark-28 px-6 py-16  mt-10  lg:mt-16 ${rubik.className}`}>
                    <h1 className={`text-4xl text-center font-bold mb-16 ${playfair.className}`}>
                        Privacy Policy
                    </h1>

                    {/* Intro */}
                    <p className="mb-10">
                        At BlueTerra | Travel & Experiences, we respect your privacy and are committed
                        to protecting your personal information. This policy explains what we collect,
                        how we use it, who we share it with, and the choices you have.
                    </p>

                    {/* Section 1 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">1. Who we are</h2>
                        <p>
                            BlueTerra L.L.C-FZ <br />
                            Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E. <br />
                            License Number: 2533928.01 <br />
                            Website:{" "}
                            <a href="https://myblueterra.com" className="text-blue-600 underline">
                                https://myblueterra.com
                            </a>
                            <br />
                            Email: info@myblueterra.com <br />
                            Phone: +971 58 541 2123
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">2. Information we collect</h2>
                        <p>We collect information when you browse our site, contact us, request a quote, or make a booking.</p>
                        <ul className="list-disc list-outside pl-8 space-y-2 mt-3">
                            <li>
                                <strong>Personal details</strong>: Name, email, phone number, nationality,
                                postal address, passport details if required for travel, travel preferences
                                and special requests.
                            </li>
                            <li>
                                <strong>Booking and payment details</strong>: Itinerary information,
                                accommodation and activity choices, loyalty numbers, and payment information.
                                Card data is processed securely by third-party payment providers. We do not
                                store full card numbers.
                            </li>
                            <li>
                                <strong>Technical data</strong>: IP address, device and browser type, pages
                                visited, and cookies used for essential site functions and analytics.
                            </li>
                            <li>
                                <strong>Communications</strong>: Messages you send to us, feedback, survey
                                responses, and marketing preferences.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">3. How we use your information</h2>
                        <ul className="list-disc list-outside pl-8 space-y-2">
                            <li>Create quotes, process bookings, and deliver travel services</li>
                            <li>Communicate itineraries, confirmations, updates, and support</li>
                            <li>Manage payments, invoices, and fraud checks</li>
                            <li>Improve our website, products, and customer experience</li>
                            <li>Send marketing that you can opt out of at any time</li>
                            <li>Meet legal, regulatory, and audit requirements</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">4. Legal grounds we rely on</h2>
                        <ul className="list-disc list-outside pl-8 space-y-2">
                            <li>To perform a contract or take steps at your request</li>
                            <li>Your consent, where required</li>
                            <li>Our legitimate interests, such as service improvement and security</li>
                            <li>Legal obligations</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">5. Sharing your information</h2>
                        <p>
                            We do not sell or rent your personal data. We share only what is necessary to deliver your trip or run our business, for example with:
                        </p>
                        <ul className="list-disc list-outside pl-8 space-y-2 mt-3">
                            <li>Trusted service partners such as hotels, airlines, destination management companies, guides, and event venues</li>
                            <li>Technology and operations providers such as payment processors and CRM platforms</li>
                            <li>Professional advisers, insurers, and auditors</li>
                            <li>Authorities where required by law</li>
                        </ul>
                        <p className="mt-3">
                            We require our partners to protect your information and use it only for the agreed purpose.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">6. International transfers</h2>
                        <p>
                            Travel is global, so your information may be transferred to partners in other countries. We take reasonable steps to ensure an adequate level of protection consistent with this policy.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">7. Cookies and tracking</h2>
                        <p>
                            We use cookies to operate the site, remember preferences, analyze traffic, and enable chat or personalization. You can control cookies in your browser settings. Some features may not work without essential cookies.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">8. Data security</h2>
                        <p>
                            We use reasonable technical and organizational measures to protect your information, including encryption, secure servers, access controls, and regular reviews. No system can be guaranteed 100 percent secure, but we work to keep risks low.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">9. Data retention</h2>
                        <p>We keep your information only as long as needed for the purposes in this policy, including legal or accounting needs. Typical retention periods are:</p>
                        <ul className="list-disc list-outside pl-8 space-y-2 mt-3">
                            <li>Bookings and invoices: up to 7 years</li>
                            <li>Support communications: up to 3 years</li>
                            <li>Marketing preferences: until you opt out or delete your data</li>
                        </ul>
                    </section>

                    {/* Section 10 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">10. Your rights</h2>
                        <p>Subject to applicable law, you may:</p>
                        <ul className="list-disc list-outside pl-8 space-y-2 mt-3">
                            <li>Access a copy of your data</li>
                            <li>Correct inaccurate or incomplete data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to or restrict certain processing</li>
                            <li>Opt out of marketing at any time</li>
                        </ul>
                        <p className="mt-3">
                            To exercise your rights, contact info@myblueterra.com. We may need to verify your identity before responding.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">11. Marketing choices</h2>
                        <p>
                            You control whether you receive newsletters or promotional messages. Use the unsubscribe link in our emails or write to us at info@myblueterra.com.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">12. Children’s data</h2>
                        <p>
                            Our services are not directed to children. If you believe a child provided personal data without consent, contact us and we will delete it.
                        </p>
                    </section>

                    {/* Section 13 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">13. Contests, surveys, and testimonials</h2>
                        <p>
                            If we run a contest or survey, we will tell you what data is collected, how it will be used, and if a third party is involved. Participation is voluntary.
                        </p>
                    </section>

                    {/* Section 14 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">14. Third-party links</h2>
                        <p>
                            Our website may link to other sites. Their privacy practices are their own. Review their policies before sharing information.
                        </p>
                    </section>

                    {/* Section 15 */}
                    <section className="mb-10">
                        <h2 className="lg:text-2xl text-xl font-medium mb-3">15. Changes to this policy</h2>
                        <p>
                            We may update this policy from time to time. We will post the new version with the effective date at the top. Material changes will be highlighted where appropriate.
                        </p>
                    </section>

                    {/* Section 16 */}
                    <section>
                        <h2 className="lg:text-2xl text-xl font-medium mb-4">16. Contact us</h2>
                        <p className="space-y-1">
                            Questions, requests, or complaints about privacy:<br />
                            <strong>Email:</strong> info@myblueterra.com <br />
                            <strong>Phone:</strong> +971 58 541 2123 <br />
                            <strong>Address:</strong> Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
                        </p>

                    </section>
                </div>
                <Footer />
            </>
    )
        ;
}
