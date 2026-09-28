import { LegalPage } from "@/components/common/LegalPage";
import { LEGAL, SITE } from "@/constants";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      testId="refund-policy-page"
      title="Refund & Cancellation Policy"
      subtitle={`Refund terms for the CET examination fee, operated by ${LEGAL.legalEntity}.`}
      sections={[
        {
          paragraphs: [
            `This Refund & Cancellation Policy applies to the CET (Corporate Entrance Test) examination fee of ₹${SITE.examFee}, collected by ${LEGAL.legalEntity}, an initiative by ${LEGAL.initiativeBy}.`,
          ],
        },
        {
          heading: "Non-Refundable Fee",
          paragraphs: [
            `The examination fee of ₹${SITE.examFee} is non-refundable once an application has been submitted. The fee covers assessment infrastructure, candidate evaluation, your National Rank Card, and your personalized Corporate Readiness Report.`,
          ],
        },
        {
          heading: "Cancellation",
          paragraphs: [
            "Candidates may choose not to complete a draft application before payment at no charge. Once payment is completed and the application submitted, cancellation does not entitle the candidate to a refund.",
          ],
        },
        {
          heading: "Duplicate / Failed Payments",
          paragraphs: [
            `In the event of a duplicate charge or a payment that was debited but not reflected against your application, please contact us at ${LEGAL.email} within 7 days with your transaction reference. Verified duplicate or failed transactions will be refunded to the original payment method within 5–7 business days.`,
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `For refund-related queries, email ${LEGAL.legalEntity} at ${LEGAL.email} with your application number and payment reference.`,
          ],
        },
      ]}
    />
  );
}
