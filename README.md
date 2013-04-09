# Dump

The best project ever.

## Getting Started
Install the module with: `npm install dump`
Requires redis to be running:
```bash
# * The path to redis.conf is the default when redis is installed with homebrew.
redis-server /usr/local/etc/redis.conf
```

```javascript
var dump = require('dump').createServer().start();
```

```bash
# Add documents to storage:
curl -is -d '{"foo": "bar", "baz": ["hello", "tom"]}' localhost:8080/storage

# Get documents from storage:
curl -is localhost:8080/storage/17
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 tnightingale  
Licensed under the MIT license.
