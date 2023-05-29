export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'env',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: process.env.DEFAULT_LIMIT || 5
});

export const PokeApiUrl = () => ({ 
  apiUrl: process.env.POKE_API_URL 
});

