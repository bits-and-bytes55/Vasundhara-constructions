import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import { seoConfig } from "../../config/seoConfig"

export default function RouteSEO() {

  const location = useLocation()

  const BASE_URL =
    import.meta.env.PROD
      ? "https://vasundharaconstruction.co.in"
      : window.location.origin

  const url =
    `${BASE_URL}${location.pathname}`

  const seo =
    seoConfig[
    location.pathname as keyof typeof seoConfig
    ] ?? {

      title:
        "Vasundhara Construction",

      description:
        "Professional construction and interior services in Noida.",

      keywords:
        "construction company noida, interior design noida",
    }



  const image =
    `${BASE_URL}/logo.png`

  return (

    <Helmet>

      <html lang="en" />

      <title>
        {seo.title}
      </title>

      <meta
        name="description"
        content={seo.description}
      />

      <meta
        name="keywords"
        content={seo.keywords}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={url}
      />

      <meta
        property="og:title"
        content={seo.title}
      />

      <meta
        property="og:description"
        content={seo.description}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:site_name"
        content="Vasundhara Construction"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={seo.title}
      />

      <meta
        name="twitter:description"
        content={seo.description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      <script
        type="application/ld+json"
      >
        {JSON.stringify({

          "@context":
            "https://schema.org",

          "@type":
            "ConstructionCompany",

          "name":
            "Vasundhara Construction",

          "url":
            "https://vasundharaconstruction.co.in",

          "logo":
            "https://vasundharaconstruction.co.in/logo.png",

          "telephone":
            "+91 9818866849",

          "address": {

            "@type":
              "PostalAddress",

            "addressLocality":
              "Noida",

            "addressCountry":
              "IN"

          },

          "areaServed":
            "Noida"

        })}
      </script>

    </Helmet>

  )

}