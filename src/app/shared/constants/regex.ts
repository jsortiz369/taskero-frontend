export const REGEX = {
  INPUT_TEXT: /^(-?[\p{L}\p{M}\p{N}\u0027\u2019\u2018\u02BB\u02BC]+([\s])?)*$/u,
  INPUT_USERNAME: /^(-?[\p{L}\p{M}\d\u0027\u2019\u2018\u02BB\u02BC]+([_.-])?)*$/u,
  INPUT_EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  INPUT_PASSWORD_MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,12}$/,
  INPUT_PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/,
};

/*
\p{L}-> letter (unicode)
\p{M}-> mark (unicode)
\p{N}-> number (unicode)
\u0027-> ' (unicode)
\u2019-> , (unicode)
\u2018-> ‘ (unicode)
\u02BB-> ʻ (unicode)
\u02BC-> ʼ (unicode)
*/
