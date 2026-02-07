
import React from "react";
import { Helmet } from "react-helmet";
import content from "../data/index";

export default function SEOHelmet({
  title,
  description,
  image = "/og-default.png",
  path = "",
}) {
  // Try to infer site URL (works on production, GitHub Pages, and local)
  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}`
      : "https://www.your-portfolio.com";

  const pageUrl = `${siteUrl}${path}`;

  const personName = content?.hero?.name || "Pradul P";

  // JSON-LD Schema
  const ldPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    url: siteUrl,
    jobTitle: "Civil Engineer & BIM Specialist",
    image: siteUrl + (content?.hero?.avatar || "/pradul-avatar.jpg"),
  };

  const ldOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LUDARP",
    url: siteUrl,
    logo: siteUrl + (content?.hero?.avatar || "/pradul-avatar.jpg"),
  };

  const ldSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: title,
    description,
    publisher: {
      "@type": "Organization",
      name: "LUDARP",
    },
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* OpenGraph SEO */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="LUDARP" />

      {/* Twitter SEO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Preconnect optimizations */}
      <link rel="preconnect" href={siteUrl} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Optional preloads (improves performance & LCP) */}
      <link
        rel="preload"
        href={content?.hero?.avatar || "/pradul-avatar.jpg"}
        as="image"
      />
      <link rel="preload" href="/placeholder-project.webp" as="image" />
      <link rel="preload" href="/Pradul_cv.pdf" as="document" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(ldPerson)}</script>
      <script type="application/ld+json">{JSON.stringify(ldOrg)}</script>
      <script type="application/ld+json">{JSON.stringify(ldSite)}</script>
    </Helmet>
  );
}
