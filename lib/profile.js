/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.id = json.id;
  profile.username = json.publicAlias;
  profile.displayName = json.displayName;

  if (json.emailAddress) {
    profile.emails = [{ value: json.emailAddress, type: 'account', primary: true }];
  }

  profile.photos = [{
    value: 'https://apis.live.net/v5.0/' + json.id + '/picture', 
    live: true
  }];

  profile.accounts = json.accounts;

  if (json.accounts && json.accounts.length) {
    for (var i = 0; i < json.accounts.length; i++) {
      var account = json.accounts[i];
      profile.photos.push({
        value: 'https://'+ account.accountName +'.vsspsext.visualstudio.com/_apis/profile/profiles/' + json.id + '/avatar',
        account: account.accountName
      });
    }
  }

  return profile;
};
