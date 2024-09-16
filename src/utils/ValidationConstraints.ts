import { validate } from 'validate.js';

// Define types for the validation functions
type ValidationConstraints = {
  presence?: {
    allowEmpty: boolean;
  };
  format?: {
    pattern: RegExp;
    message: string;
  };
  length?: {
    minimum: number;
    message: string;
  };
};

type ValidationResult = {
  [key: string]: string[];
};

type Locale = 'en' | 'ar';

const messages = {
  en: {
    blank: "Value can't be blank.",
    email: "Invalid email address.",
    password: "Must be at least 6 characters.",
    creditCard: "Invalid credit card number.",
    cvv: "Invalid CVV.",
    expiryDate: "Invalid expiry date. Please use MM/YY format.",
  },
  ar: {
    blank: "لا يمكن أن يكون القيمة فارغة.",
    email: "عنوان البريد الإلكتروني غير صحيح.",
    password: "يجب أن يكون على الأقل 6 أحرف.",
    creditCard: "رقم بطاقة الائتمان غير صحيح.",
    cvv: "CVV غير صحيح.",
    expiryDate: "تاريخ انتهاء الصلاحية غير صحيح. يرجى استخدام تنسيق MM/YY.",
  },
};

// Function to get localized message
const getMessage = (locale: Locale, key: keyof typeof messages['en']): string => {
  return messages[locale][key];
};

// Validate string values
export const validateString = (id: string, value: string, locale: Locale): string[] | undefined => {
  const constraints: ValidationConstraints = {
    presence: {
      allowEmpty: false
    }
  };

  if (value !== "") {
    constraints.format = {
      pattern: /.+/,
      message: getMessage(locale, 'blank')
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints }) as ValidationResult;
  return validationResult && validationResult[id];
};

// Validate email values
export const validateEmail = (id: string, value: string, locale: Locale): string[] | undefined => {
  const constraints: ValidationConstraints = {
    presence: {
      allowEmpty: false
    },
    email: {
      message: getMessage(locale, 'email')
    }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints }) as ValidationResult;
  return validationResult && validationResult[id];
};

// Validate password values
export const validatePassword = (id: string, value: string, locale: Locale): string[] | undefined => {
  const constraints: ValidationConstraints = {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 6,
      message: getMessage(locale, 'password')
    }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints }) as ValidationResult;
  return validationResult && validationResult[id];
};

// Validate credit card numbers
export const validateCreditCardNumber = (id: string, value: string, locale: Locale): string[] | undefined => {
  const constraints: ValidationConstraints = {
    presence: {
      allowEmpty: false
    },
    format: {
      pattern: /^(?:\d{4}-){3}\d{4}$|^\d{16}$/,
      message: getMessage(locale, 'creditCard')
    }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints }) as ValidationResult;
  return validationResult && validationResult[id];
};

// Validate CVV values
export const validateCVV = (id: string, value: string, locale: Locale): string[] | undefined => {
  const constraints: ValidationConstraints = {
    presence: {
      allowEmpty: false
    },
    format: {
      pattern: /^[0-9]{3,4}$/,
      message: getMessage(locale, 'cvv')
    }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints }) as ValidationResult;
  return validationResult && validationResult[id];
};

// Validate expiry dates
export const validateExpiryDate = (id: string, value: string, locale: Locale): string[] | undefined => {
  const constraints: ValidationConstraints = {
    presence: {
      allowEmpty: false
    },
    format: {
      pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      message: getMessage(locale, 'expiryDate')
    }
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints }) as ValidationResult;
  return validationResult && validationResult[id];
};
