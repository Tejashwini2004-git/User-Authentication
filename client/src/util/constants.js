// export const AppConstants = {
//   BACKEND_URL: "http://localhost:8081/api/v1.0",
// };

export const AppConstants = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
};
