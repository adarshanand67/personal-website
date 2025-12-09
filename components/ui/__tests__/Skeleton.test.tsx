import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonCard, SkeletonList, SkeletonText } from '../Skeleton';

describe('Skeleton Components', () => {
    describe('Skeleton', () => {
        it('should render with default styles', () => {
            const { container } = render(<Skeleton />);
            const skeleton = container.firstChild;

            expect(skeleton).toHaveClass('animate-pulse');
            expect(skeleton).toHaveClass('rounded-md');
        });

        it('should accept custom className', () => {
            const { container } = render(<Skeleton className="custom-class" />);
            const skeleton = container.firstChild;

            expect(skeleton).toHaveClass('custom-class');
        });
    });

    describe('SkeletonCard', () => {
        it('should render card skeleton', () => {
            const { container } = render(<SkeletonCard />);

            expect(container.querySelector('.border')).toBeInTheDocument();
        });
    });

    describe('SkeletonList', () => {
        it('should render default number of items', () => {
            const { container } = render(<SkeletonList />);
            const items = container.querySelectorAll('.flex.items-center');

            expect(items).toHaveLength(3);
        });

        it('should render custom number of items', () => {
            const { container } = render(<SkeletonList count={5} />);
            const items = container.querySelectorAll('.flex.items-center');

            expect(items).toHaveLength(5);
        });
    });

    describe('SkeletonText', () => {
        it('should render default number of lines', () => {
            const { container } = render(<SkeletonText />);
            const lines = container.querySelectorAll('.h-4');

            expect(lines).toHaveLength(3);
        });

        it('should render custom number of lines', () => {
            const { container } = render(<SkeletonText lines={5} />);
            const lines = container.querySelectorAll('.h-4');

            expect(lines).toHaveLength(5);
        });
    });
});
