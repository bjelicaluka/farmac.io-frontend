// Minimum one character before and after '@', minimum two characters after '.'
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Minimum eight characters, at least one letter, one number and one special character
export function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(String(password));
}

// Minimum three characters
export function validateText(text) {
  const re = /^[A-Za-z\s]+$/;
  return !!(text) && re.test(String(text));
}

export function validateAlphanumericalWord(word) {
  const re = /^[a-zA-Z0-9]+$/;
  return !!(word) && re.test(String(word));
} 