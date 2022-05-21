const app  = require('./expressSetup');
const port = process.env.port || 5000;

app.listen(port, () => console.log('Listening on port: ' + port));