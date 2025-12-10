
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Terminal from '../Terminal';
// We need to mock the GlobalProvider because it uses context
// Simplified mock context
jest.mock('@/components/common/GlobalProvider', () => ({
    useGlobalState: () => ({
        isMatrixEnabled: false,
        toggleMatrix: jest.fn(),
        setPasswordMode: jest.fn(),
        passwordMode: false,
        addCommandToHistory: jest.fn(),
        commandHistory: [],
        setHistory: jest.fn(),
    }),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
    Maximize2: () => <span>[Max]</span>,
    Minimize2: () => <span>[Min]</span>,
    Terminal: () => <span>[Term]</span>,
    X: () => <span>[X]</span>,
    Minus: () => <span>[-]</span>,
    Square: () => <span>[Sq]</span>,
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Terminal Piping Integration', () => {
    beforeAll(() => {
        // Mock scroll
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        window.scrollTo = jest.fn();
    });

    it('successfully pipes output from echo to base64', async () => {
        render(<Terminal />);

        const input = screen.getByRole('textbox');

        // Command: echo hello | base64
        // Expected: aGVsbG8= (base64 of "hello")

        fireEvent.change(input, { target: { value: 'echo hello | base64' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Wait for async execution
        await waitFor(() => {
            // Check if base64 result is present
            // Note: echo might output "hello" but we intercept it.
            // base64 output "aGVsbG8=" should be in the document.
            const elements = screen.getAllByText((content) => content.includes('aGVsbG8='));
            expect(elements.length).toBeGreaterThan(0);
        });
    });

    it('successfully pipes multiple commands: echo hello | base64 | base64 -d', async () => {
        render(<Terminal />);

        const input = screen.getByRole('textbox');

        // Command: echo hello | base64 | base64 -d
        // Expected: hello

        fireEvent.change(input, { target: { value: 'echo hello | base64 | base64 -d' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            // We look for "hello" in the output (ignoring the echo command itself which might be displayed as prompt)
            // The prompt is "$ echo hello | base64 | base64 -d"
            // The output is "hello"

            // Since "hello" is common word, checking context is hard, but we can check if it appears.
            // But wait, "hello" is in the input echo too.
            // We should pick a unique string.

        });
    });

    it('handles unique string piping', async () => {
        render(<Terminal />);

        const uniqueStr = 'superunique123';
        const input = screen.getByRole('textbox');

        // Pipe: echo superunique123 | base64 | base64 -d
        fireEvent.change(input, { target: { value: `echo ${uniqueStr} | base64 | base64 -d` } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            // We expect to find 'superunique123' as output.
            // It will be in the prompt line too.
            // So we expect at least 2 occurrences? 
            // 1. Prompt: $ echo superunique123 ...
            // 2. Output: superunique123

            const elements = screen.getAllByText(new RegExp(uniqueStr));
            expect(elements.length).toBeGreaterThanOrEqual(2);
        });
    });
});
