import * as yup from "yup";

export const registerSchema = yup.object().shape({
    name: yup.string()
        .min(3, 'Full name must be 3 characters or more')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .required('Please enter your full name'),
    email: yup.string()
        .email('Please enter a valid email address')
        .required('Please enter your email address'),
    password: yup.string()
        .required('Please enter your password')
        .max(16, 'Password must be 16 characters or less')

});

export const loginSchema = yup.object().shape({
    email: yup.string()
        .required('Please enter your email address')
        .email('Please enter a valid email address'),
    password: yup.string()
        .required('Please enter your password')
        .max(16, 'Password must be 16 characters or less'),
});