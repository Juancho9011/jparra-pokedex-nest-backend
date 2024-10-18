export const EnvConfiguration = () => {

    const ENV_PROCESS = process.env

    return {
        environment: ENV_PROCESS.NODE_ENV || 'dev',
        mongodb: ENV_PROCESS.MONGODB,
        port: +ENV_PROCESS.PORT || 3002,
        default_limit: +ENV_PROCESS.DEFAULT_LIMIT || 8
    }

}