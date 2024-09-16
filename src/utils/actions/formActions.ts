import {
  validateString,
  validateEmail,
  validatePassword,
  validateCreditCardNumber,
  validateExpiryDate,
  validateCVV,
} from "../ValidationConstraints";

// Define a type for the possible input IDs to improve type safety
type InputId =
  | "fullName"
  | "location"
  | "userName"
  | "phoneNumber"
  | "creditCardHolderName"
  | "bio"
  | "address"
  | "street"
  | "postalCode"
  | "appartment"
  | "nickname"
  | "link"
  | "occupation"
  | "email"
  | "newEmail"
  | "password"
  | "confirmPassword"
  | "newPassword"
  | "confirmNewPassword"
  | "resetToken"
  | "creditCardNumber"
  | "creditCardExpiryDate"
  | "cvv";

// Define a return type for validation functions (for example, it can be a string or boolean, depending on your implementation)
type ValidationResult = string | boolean;

// Updated validateInput function with explicit types
export const validateInput = (
  inputId: InputId,
  inputValue: string
): ValidationResult => {
  switch (inputId) {
    // String validation
    case "fullName":
    case "location":
    case "userName":
    case "phoneNumber":
    case "creditCardHolderName":
    case "bio":
    case "address":
    case "street":
    case "postalCode":
    case "appartment":
    case "nickname":
    case "link":
    case "occupation":
    case "resetToken":
      return validateString(inputId, inputValue);

    // Email validation
    case "email":
    case "newEmail":
      return validateEmail(inputId, inputValue);

    // Password validation
    case "password":
    case "confirmPassword":
    case "newPassword":
    case "confirmNewPassword":
      return validatePassword(inputId, inputValue);

    // Credit card number validation
    case "creditCardNumber":
      return validateCreditCardNumber(inputId, inputValue);

    // Credit card expiry date validation
    case "creditCardExpiryDate":
      return validateExpiryDate(inputId, inputValue);

    // CVV validation
    case "cvv":
      return validateCVV(inputId, inputValue);

    // Default case if the input ID is not recognized
    default:
      throw new Error(`Unknown input ID: ${inputId}`);
  }
};
