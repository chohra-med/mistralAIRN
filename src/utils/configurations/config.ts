export enum ENVIRONMENT {
    TESTING = 'TESTING',
    DEVELOPMENT = 'DEVELOPMENT',
    STAGING = 'STAGING',
    PRODUCTION = 'PRODUCTION',
}

const API_BASE_URL_DEV = '';
const API_BASE_URL_MISTRAL_AI = 'https://api.mistral.ai/v1';
const testing = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_BASE_MISTRALAI: API_BASE_URL_MISTRAL_AI,
}

const development = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_BASE_MISTRALAI: API_BASE_URL_MISTRAL_AI,
}
const staging = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_BASE_MISTRALAI: API_BASE_URL_MISTRAL_AI,
}

const production = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_BASE_MISTRALAI: API_BASE_URL_MISTRAL_AI,
}

export const CURRENT_ENVIRONMENT: ENVIRONMENT = ENVIRONMENT.DEVELOPMENT;


const environments = {
    TESTING: testing,
    DEVELOPMENT: development,
    STAGING: staging,
    PRODUCTION: production,
};

const environmentProject = environments[CURRENT_ENVIRONMENT];

export const API_BASE_URL = environmentProject.API_BASE_URL;
export const API_BASE_MISTRALAI = environmentProject.API_BASE_MISTRALAI;
