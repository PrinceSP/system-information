const crypto 		= require('crypto');

function getPaginator(resultCount,onPage,pageSize,url){
    var paginator = {};
    paginator.pageSize = pageSize;
    paginator.first = (onPage - 1) * pageSize + 1;
    paginator.totalPageCount = Math.floor(resultCount/pageSize)
                                   + (resultCount%pageSize == 0? 0 : 1);
    paginator.currentPage = onPage;
    url = url.replace('/page-'+onPage,'');
    url = url.replace('/halaman-'+onPage,'');

    paginator.basePath = url;

    paginator.first = paginator.first-1; //mulai dari 0
//    paginator.totalPageCount = paginator.totalPageCount+1;
    return paginator;
}
module.exports.getPaginator = getPaginator;

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}
module.exports.updateQueryStringParameter = updateQueryStringParameter;

function extractFilter(attributes,key){
    if(!attributes || attributes=='') return '';
    var result = '';
        const regex = new RegExp(".*"+key+"-(.*?)(-|$)");
    //    const regex = /.*tipe-(.*?)(-|$)/g;
        const str = attributes;
        var m = [];

//        while ((m = regex.exec(str)) !== null) {
        if ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
    //        if (m.index === regex.lastIndex) {
    //            regex.lastIndex++;
    //        }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                if(groupIndex==1) result = match;
//                console.log(`Found match, group ${groupIndex}: ${match}`);
            });
        }
        return result;
}
module.exports.extractFilter = extractFilter;

var isTrue = function(val){
    if(typeof(val) !== 'undefined' && val !='any' && val != null && val != 'false' && val != false && val != ""){
        return true;
    }else return false;
}
module.exports.isTrue = isTrue;

var removePartnerFromKeywords = function(keywords,partner){
    if(partner){
//        _logger.info('=============>partner='+filter.partner);
        var keySplit = keywords.split(',');
        if(keySplit.length > 0){
            if(keySplit[0]==partner){
                //remove first element
                keySplit.shift();
                keywords = keySplit.join(',');
            }
        }
//        _logger.info('=============>keywords='+keywords);
    }
    return keywords;
}
module.exports.removePartnerFromKeywords = removePartnerFromKeywords;

var removeLocationFromKeywords = function(keywords,location){
    if(location && location != 'any'){
//        _logger.info('=============>location='+filter.location);
        var keySplit = keywords.split(',');
        if(keySplit.length > 0){
//            if(keySplit[0]==location){
                //remove first element
                keySplit.shift();
                keywords = keySplit.join(',');
//            }
        }
//        _logger.info('=============>keywords='+keywords);
    }
    return keywords;
}
module.exports.removeLocationFromKeywords = removeLocationFromKeywords;


//contoh 2017-07-11 12:30:00
function dateToHString(dateString){
    var result = 'kemarin';
    //TODO RAYASEM "bikin format date convert ke human format. contoh input: 2017-07-11 12:30:00. output: dua hari yang lalu."

    return result;
}

function md5(str)
{

	return crypto.createHash('md5').update(str).digest('hex');
}
function validatePassword(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}
function validateNumberLetterOnly(str,callback){
    var alphanumeric = str;
    var myRegEx  = /[^a-z\d]/i;
    var isValid = !(myRegEx.test(alphanumeric));
    if(!isValid){
        callback(false);
    }else{
        callback(true);
    }
}
function generateSalt()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

function encryptPassword(password,callback){
    var salt = generateSalt();
	callback(salt + md5(password + salt));
}

/**
 * Number.prototype.format(n, x)
 *
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
function currency_format(str, n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return str.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
};

function create_unique_code(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getPaginator(resultCount,onPage,pageSize){
    var paginator = {};
    paginator.pageSize = pageSize;
    paginator.first = (onPage - 1) * pageSize + 1;
    paginator.totalPageCount = Math.floor(resultCount/pageSize)
                                   + (resultCount%pageSize == 0? 0 : 1);
    paginator.currentPage = onPage;

    paginator.first = paginator.first-1; //mulai dari 0
//    paginator.totalPageCount = paginator.totalPageCount+1;
    return paginator;
}
module.exports.getPaginator = getPaginator;

module.exports.currency_format = currency_format;
module.exports.create_unique_code = create_unique_code;
module.exports.encryptPassword = encryptPassword;
module.exports.validatePassword = validatePassword;
module.exports.md5 = md5;
module.exports.ic = function(str){
    var usernameIncaseSensitive = new RegExp("^" + str.toLowerCase()+"$", "i");
//    var usernameIncaseSensitive = new RegExp("^" + str.toLowerCase()+"", "i");
    return {$regex:usernameIncaseSensitive};
}

function removeSpecialCharacter(str){
    var desired = str.replace(/[^\w\s]/gi, '');
    return desired;
}
module.exports.removeSpecialCharacter = removeSpecialCharacter;

function strToSlug(str){
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str;
}
module.exports.strToSlug = strToSlug;
