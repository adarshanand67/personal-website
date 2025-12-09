/**
 * Privacy-friendly analytics utility
 * Can be configured with Plausible, Umami, or Simple Analytics
 */

type AnalyticsEvent = {
    name: string;
    properties?: Record<string, string | number | boolean>;
};

class Analytics {
    private enabled: boolean;

    constructor() {
        this.enabled = typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
    }

    /**
     * Track a page view
     */
    pageView(url: string) {
        if (!this.enabled) return;

        // Plausible Analytics
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible('pageview', { props: { url } });
        }

        // Umami Analytics
        if (typeof window !== 'undefined' && (window as any).umami) {
            (window as any).umami.track({ url });
        }
    }

    /**
     * Track a custom event
     */
    event(event: AnalyticsEvent) {
        if (!this.enabled) return;

        // Plausible Analytics
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible(event.name, { props: event.properties });
        }

        // Umami Analytics
        if (typeof window !== 'undefined' && (window as any).umami) {
            (window as any).umami.track(event.name, event.properties);
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
