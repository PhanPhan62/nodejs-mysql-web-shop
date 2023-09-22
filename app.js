const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const loaisanphamRoutes = require('./routes/loaisanphamRoutes');
const nhanvienRoute = require('./routes/nhanvienRoute');
const loginRoutes = require('./routes/loginRoute');
const menuRoutes = require('./routes/menuRoute');
const { create } = require('express-handlebars');
// const exphbs = require('express-handlebars');
const mysql = require('mysql');
const { log } = require('console');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cài đặt EJS làm view engine
app.set('view engine', 'ejs');

// Cấu hình tài nguyên tĩnh (nếu cần)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', loginRoutes, userRoutes, loaisanphamRoutes, menuRoutes, nhanvienRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});