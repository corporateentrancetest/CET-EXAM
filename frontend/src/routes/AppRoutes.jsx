import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import HowItWorksPage from "@/pages/HowItWorks";
import ProgramPage from "@/pages/Program";
import DubaiExperiencePage from "@/pages/DubaiExperience";
import FAQsPage from "@/pages/FAQs";
import BlogPage from "@/pages/Blog";
import ContactPage from "@/pages/Legal/Contact";
import PrivacyPolicyPage from "@/pages/Legal/PrivacyPolicy";
import RefundPolicyPage from "@/pages/Legal/RefundPolicy";
import TermsConditionsPage from "@/pages/Legal/TermsConditions";
import NotFoundPage from "@/pages/NotFound";

import LoginPage from "@/pages/Login";
import ApplyForExamPage from "@/pages/ApplyForExam";
import DashboardPage from "@/pages/Dashboard";
import AdminDashboardPage from "@/pages/Admin";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/dubai-experience" element={<DubaiExperiencePage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/apply" element={<ApplyForExamPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="candidate">
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
