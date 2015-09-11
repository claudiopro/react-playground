var context = require.context('./src/js/', true, /\.spec\.jsx?$/);
context.keys().forEach(context);
