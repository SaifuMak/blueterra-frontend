import React from "react";
import { rubik, playfair } from "@/app/fonts"
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";


export const metadata = {
  title: "Terms and Conditions | BlueTerra",
  description: "Review the terms and conditions for using My Blue Terra’s services, including user responsibilities, limitations, and governing law."
};

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <div className={`lg:max-w-9/12 ${rubik.className} mx-auto px-6 py-16 mb-10 mt-10  lg:mt-16 leading-relaxed`}>
        {/* Main Heading */}
        <h1 className={`lg:text-4xl text-3xl  font-semibold lg:mb-16 mb-10 text-center ${playfair.className}`}>
          Booking Terms & Condition
        </h1>

        <p className="mb-6">
          Thank you for visiting{" "}
          <a
            href="https://www.myblueterra.com"
            className="text-blue-600 underline"
          >
            www.myblueterra.com
          </a>
          . This site is owned and operated by <b>BlueTerra L.L.C-FZ</b>, a
          licensed limited liability company (License Number - 2533928.01)
          registered under the Meydan Free Zone Authority, Dubai, United Arab
          Emirates.
        </p>

        <p className="mb-10">
          By booking a travel experience through BlueTerra, you agree to the
          following terms and conditions, which form the basis of your contract
          with us. These terms are designed to ensure clarity, protection, and a
          seamless experience for all parties involved.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              1. Contract and Booking Confirmation
            </h2>
            <p>
              Each itinerary curated by BlueTerra is bespoke and tailored to your
              preferences. Prior to confirmation, a detailed itinerary will be
              shared via email. Once you approve, a deposit or full payment (as
              applicable) is required to confirm the booking.
            </p>
            <p>
              A binding contract is formed once payment is received and BlueTerra
              issues a formal booking confirmation. The lead traveller assumes
              responsibility for ensuring accuracy of all details, making
              payments, and sharing documentation with other group members.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              2. Pricing & Payment Terms
            </h2>
            <ul className="list-disc list-outside pl-8 space-y-2">
              <li>
                All prices are quoted in AED, or USD and include applicable taxes,
                unless stated otherwise.
              </li>
              <li>
                A deposit is required to confirm the booking. The balance is due
                45 days before departure unless otherwise stated.
              </li>
              <li>
                If full payment is not received on time, we reserve the right to
                cancel your booking and apply cancellation charges.
              </li>
              <li>
                Payments can be made via bank transfer or card. Exchange rate
                fluctuations may apply for non-AED or USD payments.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">3. Insurance</h2>
            <p>
              Travel insurance is mandatory. We strongly recommend comprehensive
              coverage that includes trip cancellation, medical, luggage, and
              personal liability. BlueTerra bears no liability for costs arising
              from insufficient coverage.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              4. Passports, Visas & Health Formalities
            </h2>
            <p className="mb-2">
              It is your responsibility to ensure all travellers hold valid travel
              documents and meet entry/exit and health requirements for all
              countries included in the itinerary. BlueTerra is not liable for
              issues arising from incorrect or insufficient documentation.
            </p>
            <p>
              If you or any member of your party have any disability, reduced mobility or medical condition,
              it is extremely important that you tell us before you book in order that we can ensure that the
              travel experience you are interested in is appropriate to and safe for your needs and make the necessary arrangements
              to make your experience go safely and smoothly. All health and mobility information will only be used in order to
              advise you in relation to
              your booking and for passing to suppliers of your travel experience in accordance with our Privacy Policy
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              5. Amendments & Cancellations by You
            </h2>
            <ul className="list-disc list-outside pl-8 space-y-2">
              <li>
                Amendments are subject to availability and may incur additional
                costs. A change fee of USD 25 may apply.
              </li>
              <li>
                You may transfer the booking to another person, subject to prior
                notice and additional fees.
              </li>
              <li>
                Cancellations must be submitted in writing and will incur charges
                based on the time before departure:
                <ul className="list-disc list-outside pl-8 ml-6 mt-2">
                  <li>More than 60 days: deposit forfeited</li>
                  <li>45–60 days: 50% of total trip cost</li>
                  <li>Less than 45 days: 100% of total cost</li>
                </ul>
              </li>
              <li>
                Please note that in many cases, scheduled airlines apply 100%
                cancellation charges and will not permit name changes or other booking alterations
                to be made (accordingly they may treat a transfer as a cancellation and re-booking).
              </li>
              <li>
                If you and/or any member of your party are considering altering your booking
                in any way, please contact our staff, who will notify you of the applicable charges.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              6. Changes & Cancellations by BlueTerra
            </h2>
            <ul className="list-disc list-outside pl-8 space-y-2">
              <li>
                We reserve the right to amend or cancel bookings due to unforeseen
                circumstances.
              </li>
              <li>
                In the event of significant changes, you will be offered options
                including full refund or alternative arrangements of similar
                value.
              </li>
              <li>
                If we are prevented from performing the contract because of
                Unavoidable and Extraordinary Circumstances and we notified
                you without undue delay before the start of the package.
              </li>

              <li>
                If we have to cancel because the minimum number of persons enrolled for the package is
                smaller than the minimum number stated in the
                contract and we notify you within the following time periods.
                <ul className="list-disc list-outside pl-8 ml-6 mt-2">
                  <li>In the case of trips lasting more than 6 days, no later than 30 days before the start of the package;</li>
                  <li>In the case of trips less than 6 days, no later than 21 days before the start of the package;</li>
                </ul>
              </li>
              <li>
                Unavoidable and Extraordinary Circumstances
              </li>
            </ul>
            <p className="">
              Unavoidable and extraordinary circumstances mean a situation beyond the control
              of a party the consequences of which could not have been avoided even if all reasonable
              measures had been taken by that party (“Unavoidable and Extraordinary Circumstances").
              Unavoidable and Extraordinary Circumstances will usually include, but are not limited to, war,
              threat of war, airport closures, airspace closures (as well as other air traffic management
              decisions which may give rise to long or overnight delays or cancellations of one or more flights ,
              the inability of airline(s) to operate flights or restriction of air traffic or transit rights or the right of airline(s)
              to enter any airspace, serious security problems such as riots, civil disturbance or unrest due to political instability
              or terrorist activity (actual or threatened), industrial disputes, technical or maintenance problems with transport,
              machinery or equipment, power failure, significant risks to human health such as outbreak of serious disease at the travel
              destination, natural or nuclear disaster, fire, flood, drought, earthquake, or adverse weather conditions (actual or threatened)
              and the Foreign
              & national Office advising against travel to a particular destination.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              7. Performance Obligation & Responsibility
            </h2>
            <p>
              BlueTerra ensures reasonable care in selecting partners and
              delivering services. Should you encounter issues during the trip,
              inform us immediately. We will endeavour to resolve issues and offer
              remedies including refunds or price reductions where applicable.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">8. Liability & Compensation</h2>
            <ul className="list-disc list-outside pl-8 space-y-2">
              <li>Our liability is limited to the total value of the package.</li>
              <li>
                BlueTerra is not responsible for losses due to third-party
                actions, traveller negligence, or force majeure events.
              </li>
              <li>
                Any airline delays or cancellations fall under the responsibility of the airline and respective international travel conventions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              9. Customer Support & Dispute Resolution
            </h2>
            <p className="mb-2">
              Should issues arise during your trip, contact our 24/7 emergency
              number provided in your travel documents.
            </p>
            <p>
              For unresolved matters, please write to us within 7 days of return.
              We aim to address all issues fairly and efficiently.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">10. Special Requests</h2>
            <p>
              BlueTerra will make every effort to accommodate special requests,
              but cannot guarantee all preferences (e.g., adjoining rooms, dietary
              needs). Such requests do not form part of the contract unless
              explicitly confirmed.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">11. Optional Excursions</h2>
            <p>
              Only excursions included in your official itinerary are part of your
              package. Additional tours or activities purchased independently or
              during the trip are outside our scope of liability.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">12. Data Protection</h2>
            <p>
              BlueTerra collects and processes personal data in compliance with
              UAE Data Protection Laws. Your data may be shared with partners
              (e.g., hotels, airlines, insurance providers) solely to fulfil your
              travel arrangements.
            </p>
            <p className="">
              By booking with us, you consent to this usage
              under our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              13. Jurisdiction & Governing Law
            </h2>
            <p>
              These terms and your contract with BlueTerra are governed by the
              laws of the United Arab Emirates. Disputes will be resolved through
              arbitration or the relevant legal authorities in Dubai.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              14. Documentation & Final Travel Pack
            </h2>
            <p>
              Final travel documents, including vouchers and confirmations, will
              be sent via email no later than 7 days prior to departure. Please
              review them carefully and notify us immediately of any discrepancies.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">
              15. Financial Protection
            </h2>
            <p>
              BlueTerra works with vetted suppliers and licensed DMCs to ensure
              all prepaid funds are secured. We maintain responsible financial
              operations for client protection.
            </p>
          </section>

          <section>
            <h2 className="lg:text-2xl text-xl font-medium mb-3">16. Contact Us</h2>
            <ul className="list-disc list-outside pl-8 space-y-2">
              <li> <strong>Business Hours :</strong> 9am–7pm GST | UAE time (Monday–Friday)</li>
              <li><strong>Email :</strong> connect@myblueterra.com</li>
              <li><strong>Phone :</strong> +971 58 541 2123 (24/7 Support for emergency)</li>
              <li>
                <strong> Office Address :</strong> BlueTerra Experiences FZE, Meydan Grandstand, 6th
                floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
