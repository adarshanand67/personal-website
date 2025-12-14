/**
 * Privacy-friendly analytics utility
 * Can be configured with Plausible, Umami, or Simple Analytics
 */

type AnalyticsEvent = {
    name: string;
    properties?: Record<string, string | number | boolean>;
};
declare global {
    interface Window {
        plausible?: (event: string, options?: { props: Record<string, string | number | boolean> }) => void;
        umami?: { track: (event: string | { url: string }, data?: Record<string, string | number | boolean>) => void };
    }
}

class Analytics {
    private enabled: boolean;

    constructor() {
        // Analytics disabled - set to true to enable in production
        this.enabled = false;
    }

    /**
     * Track a page view
     */
    pageView(url: string) {
        if (!this.enabled) return;

        // Plausible Analytics
        if (typeof window !== 'undefined' && window.plausible) {
            window.plausible('pageview', { props: { url } });
        }

        // Umami Analytics
        if (typeof window !== 'undefined' && window.umami) {
            window.umami.track({ url });
        }
    }

    /**
     * Track a custom event
     */
    event(event: AnalyticsEvent) {
        if (!this.enabled) return;

        // Plausible Analytics
        if (typeof window !== 'undefined' && window.plausible) {
            window.plausible(event.name, { props: event.properties || {} });
        }

        // Umami Analytics
        if (typeof window !== 'undefined' && window.umami) {
            window.umami.track(event.name, event.properties || {});
        }
    }

    /**
     * Track a click event
     */
    click(element: string, properties?: Record<string, string | number | boolean>) {
        this.event({
            name: 'click',
            properties: { element, ...properties },
        });
    }

    /**
     * Track a form submission
     */
    submit(form: string, properties?: Record<string, string | number | boolean>) {
        this.event({
            name: 'submit',
            properties: { form, ...properties },
        });
    }
}

export const analytics = new Analytics();
