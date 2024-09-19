export enum ENVIRONMENT {
    TESTING = 'TESTING',
    DEVELOPMENT = 'DEVELOPMENT',
    STAGING = 'STAGING',
    PRODUCTION = 'PRODUCTION',
}

const API_BASE_URL_DEV = 'https://testnet-service.lisk.com/api/v3';

const testing = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_TRANSACTIONS: `${API_BASE_URL_DEV}/transactions`,
    API_BLOCKS: `${API_BASE_URL_DEV}/blocks`,
}

const development = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_TRANSACTIONS: `${API_BASE_URL_DEV}/transactions`,
    API_BLOCKS: `${API_BASE_URL_DEV}/blocks`,
}
const staging = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_TRANSACTIONS: `${API_BASE_URL_DEV}/transactions`,
    API_BLOCKS: `${API_BASE_URL_DEV}/blocks`,
}

const production = {
    API_BASE_URL: API_BASE_URL_DEV,
    API_TRANSACTIONS: `${API_BASE_URL_DEV}/transactions`,
    API_BLOCKS: `${API_BASE_URL_DEV}/blocks`,
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
export const API_TRANSACTIONS = environmentProject.API_TRANSACTIONS;
export const API_BLOCKS = environmentProject.API_BLOCKS;
