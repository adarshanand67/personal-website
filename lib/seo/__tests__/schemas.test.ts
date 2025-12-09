import { generatePersonSchema, generateWebSiteSchema, generateBlogPostSchema } from '../schemas';

describe('SEO Schemas', () => {
    describe('generatePersonSchema', () => {
        it('should generate valid Person schema', () => {
            const schema = generatePersonSchema();

            expect(schema['@context']).toBe('https://schema.org');
            expect(schema['@type']).toBe('Person');
            expect(schema.name).toBeDefined();
            expect(schema.jobTitle).toBeDefined();
            expect(schema.url).toBeDefined();
            expect(schema.sameAs).toBeInstanceOf(Array);
        });

        it('should include work organization', () => {
            const schema = generatePersonSchema();

            expect(schema.worksFor).toBeDefined();
            expect(schema.worksFor['@type']).toBe('Organization');
        });

        it('should include education', () => {
            const schema = generatePersonSchema();

            expect(schema.alumniOf).toBeDefined();
            expect(schema.alumniOf['@type']).toBe('EducationalOrganization');
        });
    });

    describe('generateWebSiteSchema', () => {
        it('should generate valid WebSite schema', () => {
            const schema = generateWebSiteSchema();

            expect(schema['@context']).toBe('https://schema.org');
            expect(schema['@type']).toBe('WebSite');
            expect(schema.name).toBeDefined();
            expect(schema.description).toBeDefined();
            expect(schema.url).toBeDefined();
        });
    });

    describe('generateBlogPostSchema', () => {
        it('should generate valid BlogPosting schema', () => {
            const post = {
                title: 'Test Post',
                date: '2024-01-01',
                excerpt: 'Test excerpt',
                slug: 'test-post',
            };

            const schema = generateBlogPostSchema(post);

            expect(schema['@context']).toBe('https://schema.org');
            expect(schema['@type']).toBe('BlogPosting');
            expect(schema.headline).toBe(post.title);
            expect(schema.datePublished).toBe(post.date);
            expect(schema.description).toBe(post.excerpt);
        });

        it('should include author information', () => {
            const post = {
                title: 'Test Post',
                date: '2024-01-01',
                excerpt: 'Test excerpt',
                slug: 'test-post',
            };

            const schema = generateBlogPostSchema(post);

            expect(schema.author).toBeDefined();
            expect(schema.author['@type']).toBe('Person');
            expect(schema.publisher).toBeDefined();
        });
    });
});
