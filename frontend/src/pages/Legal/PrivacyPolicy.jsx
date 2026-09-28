import { LegalPage } from "@/components/common/LegalPage";
import { LEGAL, SITE } from "@/constants";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      testId="privacy-policy-page"
      title="Privacy Policy"
      subtitle={`How ${LEGAL.legalEntity} collects, uses, and protects your information.`}
      sections={[
        {
          paragraphs: [
            `This Privacy Policy explains how ${LEGAL.legalEntity} ("we", "us"), the operator of CET (Corporate Entrance Test), an initiative by ${LEGAL.initiativeBy}, handles personal information collected through this website.`,
          ],
        },
        {
          heading: "Information We Collect",
          list: [
            "Identity details: name, date of birth, gender, category, and government ID information.",
            "Contact details: email address and phone number.",
            "Academic details: college, university, course, graduation year, and CGPA.",
            "Documents: photograph, signature, ID proof, and college ID card.",
            "Payment information: processed securely via our payment gateway partner; we do not store card details.",
          ],
        },
        {
          heading: "How We Use Your Information",
          list: [
            "To create and manage your CET application and candidate account.",
            "To process the examination fee and issue receipts.",
            "To conduct the examination, generate your National Rank, and share results.",
            "To facilitate employer evaluation and the Corporate Launch Program.",
            "To communicate official notifications, dates, and updates.",
          ],
        },
        {
          heading: "Data Sharing",
          paragraphs: [
            "We share candidate data only with participating employers and evaluation partners strictly for the purposes of the examination and selection process. We do not sell personal data to third parties.",
          ],
        },
        {
          heading: "Data Security",
          paragraphs: [
            "We implement reasonable technical and organizational measures to protect your data. Uploaded documents are stored securely with restricted access.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `For any privacy-related queries, contact ${LEGAL.legalEntity} at ${LEGAL.email}.`,
          ],
        },
      ]}
    />
  );
}
