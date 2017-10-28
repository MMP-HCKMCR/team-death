module.exports = {
    port: 3000,

    locale: 'en-GB',

    host_url: (process.env.HOST_URL || 'http://localhost:3000'),

    mssql: {
        user: 'MPP1', 
        password: 'K.F3;gGAJ)+4xUbk',
        server: 'ec2-52-211-119-222.eu-west-1.compute.amazonaws.com',
        database: 'MPP_TEAM_DEATH'
    }
}