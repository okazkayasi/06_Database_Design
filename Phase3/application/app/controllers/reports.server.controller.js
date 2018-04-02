/*
 business logic for ITEM related tasks
*/
var config = require('../../config/config'),
    reports = require('../model/reports.server.model'),
    logger = require('../../config/logger');

// =====================================
// View Category Report ================
// =====================================
exports.category = function(req, res) {
    req.session.returnTo = req.url;	

    var jsonResult;

    reports.getCategoryReport(function(err, results) {
        if (err) {
            return done(err);			
        } else {	
            logger.debug(results);
            jsonResult = results;	

            res.render('report-category', {
                title: 'Category Report',
                menugroup: 'report',
                submenu: 'category',
                messages: '',
                backUrl: req.url,
                userid: req.user.username,
                username: req.user.firstName + ' ' + req.user.lastName,
                membersince: req.user.created,
                sessionTimeOut: 'yes',
                sessionTimeOutDuration: config.sessionTimeOutDuration
            });

        }
    });

};

// =====================================
// View User Report ================
// =====================================
exports.user = function(req, res) {
    req.session.returnTo = req.url;	

    var jsonResult;

    reports.getUserReport(function(err, results) {
        if (err) {
            return done(err);			
        } else {	
            logger.debug(results);
            jsonResult = results;	

            res.render('report-user', {
                title: 'User Report',
                menugroup: 'report',
                submenu: 'user',
                messages: '',
                backUrl: req.url,
                userid: req.user.username,
                username: req.user.firstName + ' ' + req.user.lastName,
                membersince: req.user.created,
                sessionTimeOut: 'yes',
                sessionTimeOutDuration: config.sessionTimeOutDuration
            });

        }
    });

};