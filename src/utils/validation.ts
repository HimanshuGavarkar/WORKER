/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate employee ID format
 */
export const isValidEmployeeId = (employeeId: string): boolean => {
  // Assuming format: letters followed by numbers (e.g., EMP001, WRK123)
  const empIdRegex = /^[A-Z]{2,4}\d{3,6}$/;
  return empIdRegex.test(employeeId.toUpperCase());
};

/**
 * Validate RFID card format
 */
export const isValidRFID = (rfid: string): boolean => {
  // Assuming hexadecimal format
  const rfidRegex = /^[0-9A-Fa-f]{8,16}$/;
  return rfidRegex.test(rfid);
};

/**
 * Password strength validation
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};