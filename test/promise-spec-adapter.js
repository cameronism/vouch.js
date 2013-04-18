// eval ../vouch.js
eval(
    require('fs').readFileSync(
        require('path').join(__dirname, '..', 'vouch.js'),
        'utf8'));

exports.pending = function() {
    var promise = vouch({});
    return {
        promise: promise[0],
        fulfill: promise[1],
        reject: promise[2]
    };
};
