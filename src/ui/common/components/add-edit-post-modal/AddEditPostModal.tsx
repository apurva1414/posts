"use client"

import * as Yup from "yup";
import { useCreatePost, usePostById, useUpdatePost } from "@/hooks";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from './AddEditPostModal.module.scss';
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";


interface AddEditPostModalProps {
    isOpen: { visible: boolean; id: string | null; }
    setIsOpen: Dispatch<SetStateAction<{ visible: boolean; id: string | null; }>>
    refetch: () => void;
}
const AddEditPostModal = ({ isOpen, setIsOpen, refetch }: AddEditPostModalProps) => {
    const { mutate: createPost } = useCreatePost();
    const { mutate: updatePost } = useUpdatePost();
    const { data, isLoading } = usePostById(isOpen?.id as string);

    const [initialValues, setInitialValues] = useState({ title: "", body: "" });

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        body: Yup.string().required("Body is required"),
    });

    const handleSubmit = (values: { title: string; body: string }) => {
        if (isOpen.id) {
            updatePost({
                id: isOpen.id,
                title: values.title,
                body: values.body,
                userId: 1,
            }, {
                onSuccess: () => {
                    refetch();
                    setIsOpen({ visible: false, id: null });
                    toast.success("Post updated successfully");
                }
            });
        } else {
            createPost({
                title: values.title,
                body: values.body,
                userId: 1,
            }, {
                onSuccess: () => {
                    refetch();
                    setIsOpen({ visible: false, id: null });
                    toast.success("Post created successfully");
                }
            });
        }
    };

    useEffect(() => {
        if (data && isOpen?.id) {
            setInitialValues({
                title: data.title,
                body: data.body,
            });
        } else {
            setInitialValues({ title: "", body: "" });
        }
    }, [data, isOpen]);

    return (
        <>
            {isOpen.visible && (
                <div
                    className={styles.modalOverlay}
                >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{isOpen?.id ? "Edit" : "Add"} Post</h2>
                            <span className={styles.ModalcloseIcon} onClick={() => setIsOpen({ visible: false, id: null })}>
                                <AiOutlineClose />
                            </span>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            enableReinitialize
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="title">
                                            Title
                                        </label>
                                        <Field
                                            id="title"
                                            name="title"
                                            type="text"
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className={styles.errorMessage}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="body">
                                            Body
                                        </label>
                                        <Field
                                            id="body"
                                            name="body"
                                            as="textarea"
                                            rows={4}
                                        />
                                        <ErrorMessage
                                            name="body"
                                            component="div"
                                            className={styles.errorMessage}
                                        />
                                    </div>

                                    <div className={styles.buttonGroup}>
                                        <button
                                            type="submit"
                                            className={styles.saveButton}
                                            disabled={isLoading}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen({ visible: false, id: null })}
                                            className={styles.cancelButton}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEditPostModal;
