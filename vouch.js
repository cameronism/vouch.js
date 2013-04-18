// add a `then` method to object
// returns an array [obj, resolve, fail]
function vouch(obj) {
    var doneBacks = [],
        failBacks = [],
        result,
        state; // undefined: not resolved, 1: success, 2: failed

    function wrap(cb, tuple, index) {
        return function(value) {
            if (typeof cb == 'function') {
                try {
                    value = cb(value);
                } catch (ex) {
                    return tuple[2](ex);
                }

                if (value && typeof value.then == 'function') {
                    return value.then(tuple[1], tuple[2]);
                }

                // fulfill with new value
                index = 1;
            }
            tuple[index](value);
        };
    }

    function complete(finalState) {
        return function(value) {
            if (state) return;
            result = value;
            state = finalState;
            invoke(finalState == 1 ? doneBacks : failBacks);
        };
    }

    function invoke(callbacks) {
        setTimeout(function(cb){
            for (;
                cb = callbacks.shift();
                cb(result));
        }, 0);
        doneBacks = failBacks = 0;
    }

    obj.then = function(success, failure) {
        var nextPromise = vouch({});
        success = wrap(success, nextPromise, 1);
        failure = wrap(failure, nextPromise, 2);
        if (state) {
            invoke([state == 1 ? success : failure]);
        } else {
            doneBacks.push(success);
            failBacks.push(failure);
        }
        return nextPromise[0];
    };

    return [ obj, complete(1), complete(2) ];
}
