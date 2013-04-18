<a href="http://promises-aplus.github.com/promises-spec">
    <img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png"
         align="right" alt="Promises/A+ logo" />
</a>

# vouch.js

Miniscule Promises/A+ implementation.  This implementation passes the 
[Promises A+ test suite](https://github.com/promises-aplus/promises-tests) 
in under 300 bytes (after minification and gzip).

```javascript
var tuple = vouch({}),
    promise = tuple[0], // the same object given to vouch on previous line
    fulfill = tuple[1],
    reject = tuple[2];

// semi-randomly fulfill or reject the promise
setTimeout(Date.now() % 2 ? fulfill : reject, 42);

promise.then(function(){
  console.log('success');
}, function() {
  console.log('failure');
});
```

## License

Public domain
