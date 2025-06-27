// Environment variable validation for better error handling
// This prevents runtime errors and provides clear feedback for missing configuration
interface RequiredEnvVars {
  VITE_ARCGIS_LAYER_API_KEY: string;
  VITE_ARCGIS_MOCK_ORCHARDS_LAYER_API_URL: string;
  VITE_ARCGIS_ORCHARDS_LAYER_API_URL: string;
  VITE_ARCGIS_HIVEDROPS_LAYER_API_URL: string;
  VITE_ARCGIS_PERIMITERS_LAYER_API_URL: string;
}

// Validate that all required environment variables are present
export const validateEnvironmentVariables = (): RequiredEnvVars => {
  const requiredVars: (keyof RequiredEnvVars)[] = [
    'VITE_ARCGIS_LAYER_API_KEY',
    'VITE_ARCGIS_MOCK_ORCHARDS_LAYER_API_URL',
    'VITE_ARCGIS_ORCHARDS_LAYER_API_URL',
    'VITE_ARCGIS_HIVEDROPS_LAYER_API_URL',
    'VITE_ARCGIS_PERIMITERS_LAYER_API_URL'
  ];

  const missingVars: string[] = [];
  const validatedEnv: Partial<RequiredEnvVars> = {};

  // Check each required variable
  for (const varName of requiredVars) {
    const value = import.meta.env[varName];
    
    if (!value || value.trim() === '') {
      missingVars.push(varName);
    } else {
      validatedEnv[varName] = value;
    }
  }

  // Throw descriptive error if any variables are missing
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.map(v => `  - ${v}`).join('\n')}\n\n` +
      'Please check your .env file and ensure all ArcGIS configuration is present.'
    );
  }

  return validatedEnv as RequiredEnvVars;
};

// Export validated environment variables for use throughout the app
export const ENV = validateEnvironmentVariables();