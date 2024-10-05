export const envApiConfig = () => {
  const envConfig = process.env.NODE_ENV;
  if (envConfig === 'development') {
    return 'http://localhost:3001';
  }
  return '/api';
};
