const db = require('../connection');

exports.getAllNV = (req, res,next) => {
    db.query('select * from NhanVien', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            const title="hihi";
            const nhanvienData = results; // Dữ liệu từ controller nhanvien.js

            // Render trang EJS và truyền dữ liệu vào
            res.render('users/index', {
                title:title,
                nhanvien: nhanvienData
            });
            res.locals.nhanvienData = results;
            next();
        }
    });
};
