#!/usr/bin/env node

var child_process = require('child_process');
child_process.execSync('npx msw init public',{stdio:[0,1,2]});
child_process.execSync('npm i -d mock-service-worker-tool',{stdio:[0,1,2]});
