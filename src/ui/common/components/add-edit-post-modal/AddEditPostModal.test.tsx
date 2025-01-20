import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEditPostModal from './AddEditPostModal';
import { useCreatePost, usePostById, useUpdatePost } from '@/hooks';

// Mock the hooks
jest.mock('@/hooks', () => ({
    useCreatePost: jest.fn(),
    usePostById: jest.fn(),
    useUpdatePost: jest.fn(),
}));

describe('AddEditPostModal', () => {
    const mockRefetch = jest.fn();
    const mockSetIsOpen = jest.fn();
    const defaultProps = {
        isOpen: { visible: true, id: null },
        setIsOpen: mockSetIsOpen,
        refetch: mockRefetch,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useCreatePost as jest.Mock).mockReturnValue({ mutate: jest.fn() });
        (useUpdatePost as jest.Mock).mockReturnValue({ mutate: jest.fn() });
        (usePostById as jest.Mock).mockReturnValue({ data: null, isLoading: false });
    });

    it('renders modal when visible is true', () => {
        render(<AddEditPostModal {...defaultProps} />);
        expect(screen.getByText('Add Post')).toBeInTheDocument();
    });

    it('displays validation errors when form is submitted empty', async () => {
        render(<AddEditPostModal {...defaultProps} />);

        const submitButton = screen.getByText('Save');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
            expect(screen.getByText('Body is required')).toBeInTheDocument();
        });
    });

    it('calls createPost when submitting new post', async () => {
        const mockCreateMutate = jest.fn();
        (useCreatePost as jest.Mock).mockReturnValue({ mutate: mockCreateMutate });

        render(<AddEditPostModal {...defaultProps} />);

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { value: 'Test Title' },
        });
        fireEvent.change(screen.getByLabelText('Body'), {
            target: { value: 'Test Body' },
        });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(mockCreateMutate).toHaveBeenCalledWith(
                {
                    title: 'Test Title',
                    body: 'Test Body',
                    userId: 1,
                },
                expect.any(Object)
            );
        });
    });

    it('loads existing post data in edit mode', () => {
        const mockPost = {
            title: 'Existing Title',
            body: 'Existing Body',
        };

        (usePostById as jest.Mock).mockReturnValue({
            data: mockPost,
            isLoading: false,
        });

        render(<AddEditPostModal {...defaultProps} isOpen={{ visible: true, id: '1' }} />);

        expect(screen.getByLabelText('Title')).toHaveValue('Existing Title');
        expect(screen.getByLabelText('Body')).toHaveValue('Existing Body');
    });

    it('closes modal when cancel button is clicked', () => {
        render(<AddEditPostModal {...defaultProps} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockSetIsOpen).toHaveBeenCalledWith({ visible: false, id: null });
    });
});