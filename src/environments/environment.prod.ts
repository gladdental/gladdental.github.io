// export const environment = {
//   production: true
// };

export const environment = {
  production: true,
  urlApi: 'https://baphuc10081998.pythonanywhere.com/',
  // token_admin : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc0MDgyMTgzLCJqdGkiOiJjMzU4NTUwODZiNTQ0OTdjYTMzMmJiMTlmNTRiMDgxYiIsInVzZXJfaWQiOjEsInR5cGUiOiJhZG1pbiJ9.qKMOtTYzUzBfNoUaGAK6ray9IorBtsmgTl6cPREh2q0"
  token: localStorage.getItem('bearToken')
};
