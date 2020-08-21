export const config = {
  envs: {
    port: process.env.port || 5555,
    apiKey: process.env.apiKey || process.env.apiDataGovKey,
    nasaUrl: process.env.nasaUrl || 'https://api.nasa.gov',
    parksUrl: process.env.parksUrl || 'https://developer.nps.gov/api/v1',
  },
};
