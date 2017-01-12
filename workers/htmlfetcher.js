var archive = require('../helpers/archive-helpers');
archive.readListofUrls(function(urls) {
  var array = [];
  _.each(urls, function(url) {
    archive.isUrlArchived(url, function(found) {
      if (!found) {
        array.push(url);
      }
    });
  });
  archive.downloadURLs(array);
});

// TODO: save websites to archive
//
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
//


// Some variable (websitesToArchive)? to store array of websites to archive
//
// readListOfUrls...
//   for each url
//     isUrlArchived?
//       if !found
//         add to websitesToArchive
//
// downloadURLs using websitesToArchive
