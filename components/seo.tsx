/**
 * @fileoverview SEO components for structured data and search optimization.
 */

import Script from "next/script";

interface StructuredDataProps {
    data: object;
}

/**
 * StructuredData component for JSON-LD schema markup.
 */
export function StructuredData({ data }: StructuredDataProps) {
    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
