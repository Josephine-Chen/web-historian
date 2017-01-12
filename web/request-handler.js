var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function(req, res) {
  // Parse url and set url path
  // GET
  if (req.method === 'GET') {
    var parsed = url.parse(req.url).pathname;
    var urlPath = parsed;

    if (parsed === '/') {
      urlPath = '/index.html';
    }

    httpHelpers.serveAssets(res, urlPath, function() {});
  }
  // Use serveAssets to grab sites
  // If it found the site on list and not yet archived
  // Redirect to loading
  // Else say it's not found


  // POST
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    //body is currently url=www.something.com
    req.on('end', function() {
      //Get just the url
      body = body.split('=')[1];
      archive.isUrlInList(body, function(found) {
        if (found) {
          archive.isUrlArchived(body, function(found) {
            if (!found) {
              // serve loading.html
              httpHelpers.redirect(res, 'loading.html');
            } else {
              // serve site
              httpHelpers.redirect(res, body);
            }
          });
        } else {
          archive.addUrlToList(body, function() {
            // serve loading.html
            httpHelpers.redirect(res, 'loading.html');
          });
        }
      });
    });
  }
  // res.end(archive.paths.list);
};
