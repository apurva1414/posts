import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from './PostCard';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('PostCard', () => {
    const mockRouter = {
        push: jest.fn(),
    };

    const mockPost = {
        id: 1,
        userId: 1,
        title: 'Test Post',
        body: 'Test body content',
        views: 100,
        reactions: {
            likes: 10,
            dislikes: 2
        },
        tags: ['test', 'mock']
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    test('renders post card with correct content', () => {
        render(<PostCard post={mockPost} />);

        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test body content...')).toBeInTheDocument();
        expect(screen.getByText('Views: 100')).toBeInTheDocument();
        expect(screen.getByText('#test')).toBeInTheDocument();
        expect(screen.getByText('#mock')).toBeInTheDocument();
    });

    test('handles shortlist toggle correctly', () => {
        render(<PostCard post={mockPost} />);

        const shortlistButton = screen.getByTitle('Add to Shortlist');
        fireEvent.click(shortlistButton);

        const storedPosts = JSON.parse(localStorage.getItem('shortlistedPosts') || '[]');
        expect(storedPosts).toContain(mockPost.id);

        fireEvent.click(shortlistButton);
        const updatedPosts = JSON.parse(localStorage.getItem('shortlistedPosts') || '[]');
        expect(updatedPosts).not.toContain(mockPost.id);
    });

    test('navigates to post detail page on card click', () => {
        render(<PostCard post={mockPost} />);

        const card = screen.getByText('Test Post').closest('div');
        fireEvent.click(card!);

        expect(mockRouter.push).toHaveBeenCalledWith('/posts/1');
    });

    test('loads initial shortlist state from localStorage', () => {
        localStorage.setItem('shortlistedPosts', JSON.stringify([1]));
        render(<PostCard post={mockPost} />);

        expect(screen.getByTitle('Remove from Shortlist')).toBeInTheDocument();
    });
});