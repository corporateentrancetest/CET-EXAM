import { LegalPage } from "@/components/common/LegalPage";
import { LEGAL, SITE } from "@/constants";

export default function TermsConditionsPage() {
  return (
    <LegalPage
      testId="terms-conditions-page"
      title="Terms & Conditions"
      subtitle={`The terms governing your use of the CET platform, operated by ${LEGAL.legalEntity}.`}
      sections={[
        {
          paragraphs: [
            `These Terms & Conditions govern your use of the CET (Corporate Entrance Test) website and services, operated by ${LEGAL.legalEntity} ("we", "us"), an initiative by ${LEGAL.initiativeBy}. By registering or applying, you agree to these terms.`,
          ],
        },
        {
          heading: "Eligibility",
          paragraphs: [
            "CET is open to final-year students and recent graduates from any recognized college or university in India. You confirm that all information provided is accurate and complete.",
          ],
        },
        {
          heading: "Application & Fee",
          list: [
            `The examination fee is ₹${SITE.examFee}, payable at the time of application.`,
            "The fee is non-refundable once an application is submitted (see Refund Policy).",
            "One national testing window is offered per examination cycle.",
          ],
        },
        {
          heading: "Candidate Conduct",
          paragraphs: [
            "Candidates must not engage in any form of malpractice, impersonation, or misrepresentation. Any violation may result in disqualification without refund.",
          ],
        },
        {
          heading: "Results & Selection",
          paragraphs: [
            "National Rank, shortlisting (60% written / 40% interview), and Top 100 selection are determined by CET's published criteria. Decisions of the examination body are final.",
          ],
        },
        {
          heading: "Limitation of Liability",
          paragraphs: [
            `${LEGAL.legalEntity} shall not be liable for indirect or consequential losses arising from the use of the platform, to the maximum extent permitted by law.`,
          ],
        },
        {
          heading: "Governing Law",
          paragraphs: [
            "These terms are governed by the laws of India, with jurisdiction in the courts of Delhi / NCR.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [`For questions about these terms, email ${LEGAL.email}.`],
        },
      ]}
    />
  );
}
