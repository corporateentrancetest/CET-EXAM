import { Helmet } from "react-helmet-async";

const SITE_NAME = "CET — Corporate Entrance Test";
const DEFAULT_DESC =
  "CET (Corporate Entrance Test) is India's national corporate-readiness exam for final-year students and graduates. Earn a National Rank, 3 months of fully-sponsored online training, employer evaluation, and a shot at the Dubai Global Experience.";

/** Per-page SEO: title, meta description, canonical, Open Graph & Twitter tags. */
export function Seo({ title, description = DEFAULT_DESC, path = "", image }) {
  const fullTitle = title ? `${title} | CET` : `${SITE_NAME} | National Corporate-Readiness Exam`;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}${path}`;
  const ogImage = image || `${origin}/og-image.jpg`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
