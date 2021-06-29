import * as React from "react";
import { emailAlreadyExists } from "../../contexts/AuthContext";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const ccardRegex = new RegExp(/^[0-9-]+$/);
const cvcRegex = new RegExp(/^[0-9]+$/);

export const termsValidator = (value) =>
  value ? "" : "It's required to agree with Terms and Conditions.";

export const emailValidator = async (value) => {
  if (!value) {
    return "Email field is required";
  } else {
    if (emailRegex.test(value)) {
      const emailExists = await emailAlreadyExists(value);
      console.log(emailExists);
      if (emailExists) {
        return "Email already exists";
      } else {
        return "";
      }
    } else {
      return "Email is not in a valid format.";
    }
  }
};

export const nameValidator = (value) =>
  !value
    ? "Full Name is required"
    : value.length < 7
    ? "Full Name should be at least 7 characters long."
    : "";
export const userNameValidator = (value) =>
  !value
    ? "User Name is required"
    : value.length < 5
    ? "User name should be at least 5 characters long."
    : "";
export const phoneValidator = (value) =>
  !value
    ? "Phone number is required."
    : phoneRegex.test(value)
    ? ""
    : "Not a valid phone number.";
export const cardValidator = (value) =>
  !value
    ? "Credit card number is required. "
    : ccardRegex.test(value)
    ? ""
    : "Not a valid credit card number format.";
export const cvcValidator = (value) =>
  !value
    ? "CVC code is required,"
    : cvcRegex.test(value) || value.length !== 3
    ? ""
    : "Not a valid CVC code format.";
export const guestsValidator = (value) =>
  !value ? "Number of guests is required" : value < 5 ? "" : "Maximum 5 guests";
export const nightsValidator = (value) =>
  value ? "" : "Number of Nights is required.";
export const birthDateValidator = (value) =>
  value ? "" : "Date of Birth is required.";
export const colorValidator = (value) => (value ? "" : "Color is required.");
export const requiredValidator = (value) =>
  value ? "" : "Error: This field is required.";
export const passwordValidator = (value) =>
  value && value.length > 5 ? "" : "Password must be at least 6 symbols.";
export const addressValidator = (value) =>
  value ? "" : "Address is required.";

export function personalValidation(name, phone, dateOfBirth) {
  return {
    name: nameValidator(name),
    phone: phoneValidator(phone),
    dateOfBirth: birthDateValidator(dateOfBirth),
  };
}

export async function accountValidation(email, password, passwordConfirm) {
  return {
    email: await emailValidator(email),
    password: passwordValidator(password),
    passwordConfirm:
      password === passwordConfirm ? "" : "Passwords do not match",
  };
}
