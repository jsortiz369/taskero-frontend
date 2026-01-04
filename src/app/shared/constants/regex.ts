export const REGEX = {
  LETTER_NUMBER_SPACE: /^[\p{L}\p{M}\p{N}\s\u0027\u2019\u2018\u02BB\u02BC]+$/u,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MEDIUM_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/,
};
