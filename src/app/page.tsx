import { BreadcrumbList, Graph, Person } from "schema-dts";
import { Schema } from "@/components/Schema";
import { AboutMeSection } from "@/components/AboutMeSection";

const person: Person = {
  "@type": "Person",
  "name": "Antoine Hervet",
  "url": "https://aher.vet",
  "@id": "https://aher.vet/#",
  "worksFor": { "@id": "https://xev.agency" },
  "honorificSuffix": "M.",
  "alumniOf": [
    {
      "@type": "Organization",
      "name": "Telecom Bretagne",
      "@id": "https://www.wikidata.org/wiki/Q2460307"
    },
    {
      "@type": "Organization",
      "name": "EmLyon Business School",
      "@id": "https://www.wikidata.org/wiki/Q1795504"
    }
  ],
  "sameAs": [
    "https://fr.linkedin.com/in/ahervet",
    "https://www.pappers.fr/dirigeant/antoine_hervet_1996-02"
  ],
  "jobTitle": {
    "@type": "DefinedTerm",
    "name": "Entrepreneur",
    "alternateName": "entrepreneur",
    "sameAs": "https://resources.workable.com/entrepreneur-job-description"
  },
  "knowsLanguage": ["french", "english"],
  "knowsAbout": [
    {
      "@type": "Thing",
      "name": "Web developpement",
      "alternateName": "Fullstack developpment",
      "@id": "https://www.wikidata.org/wiki/Q386275"
    },
    {
      "@type": "Thing",
      "name": "Enterprise ressource planning",
      "alternateName": "ERP",
      "@id": "https://www.wikidata.org/wiki/Q131508"
    },
    {
      "@type": "Thing",
      "name": "Angular",
      "alternateName": "Angular material",
      "@id": "https://www.wikidata.org/wiki/Q28925578"
    },
    {
      "@type": "Thing",
      "name": "Strapi",
      "alternateName": "Strapi CMS",
      "@id": "https://www.wikidata.org/wiki/Q105826887"
    },
    {
      "@type": "Thing",
      "name": "addiction",
      "alternateName": "addictions",
      "@id": "https://www.wikidata.org/wiki/Q12029"
    },
    {
      "@type": "Thing",
      "name": "Cryptocurrency",
      "alternateName": "Crypto",
      "@id": "https://www.wikidata.org/wiki/Q13479982"
    },
    {
      "@type": "Thing",
      "name": "Blockchain",
      "@id": "https://www.wikidata.org/wiki/Q20514253"
    }
  ]
}

export default function Home() {
  return (
    <>
      <Schema things={[person]} slug={''} />
      <AboutMeSection />
    </>
  )
}
