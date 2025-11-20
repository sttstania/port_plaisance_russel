const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const app = express();

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});

