export {}
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            // Інші ваші змінні оточення
        }
    }
}