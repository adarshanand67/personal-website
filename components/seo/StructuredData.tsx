import Script from "next/script";

interface StructuredDataProps {
    data: object;
}

/**
 * Component to inject JSON-LD structured data into page head
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
