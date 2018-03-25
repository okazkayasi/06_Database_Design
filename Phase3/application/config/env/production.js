module.exports = {
	// local development configuration
	dbHost: 'localhost',
    dbPort: '3306',
    dbUser: 'root',
    dbPassword: 'root',
    db: 'gt_bay',
	sessionSecret: 'productionSessionSecret',
    sessionTimeOutDuration: 300000,
	sessionCookieDuration: 300000   //1 Hour   3600000
}