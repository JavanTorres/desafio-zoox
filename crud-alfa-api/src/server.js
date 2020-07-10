const app = require('./app');

app.listen(process.env.NODE_ZOOX_PORT || 3000);
