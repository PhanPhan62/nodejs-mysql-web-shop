const mysql = require('mysql');
// const User = require('../models/users');
const db = require('../connection');
const nhanvienController = require('./nhanvienController'); 

// Create a new user
exports.createUser = (req, res) => {
    const {
        MaNhanVien,
        TaiKhoan,
        MatKhau,
        NgayBatDau,
        NgayKetThuc,
        TrangThai,
        LoaiQuyen
    } = req.body;

    db.query(
        'call createOrUpdateTaiKhoan(?, ?, ?, ?, ?, ?, ?)', [MaNhanVien, TaiKhoan, MatKhau, NgayBatDau,
            NgayKetThuc, TrangThai, LoaiQuyen
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi thêm mới', error: err });
            } else {
                res.status(201).json({ message: 'Thêm mới thành công!!!' });
            }
        }
    );
};


// Read all users

exports.getAllUsers = (req, res) => {

    db.query('call getAllTaiKhoan', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            const users = results[0].map((user) => {
                user.TrangThai1 = user.TrangThai == 1 ? {
                    "text": "Đang hoạt động",
                    "icon": "lni lni-checkmark",
                    "color": "inactive"
                } : {
                    "text": "Không hoạt động", 
                    "icon": "lni lni-spinner", 
                    "color": "worked"
                };
                return user;
            });
            // Tính toán các biến liên quan đến phân trang
            const page = parseInt(req.query.page) || 1;
            const perPage = 7;
            const start = (page - 1) * perPage;
            const end = page * perPage;
            const paginatedUsers = users.slice(start, end);
            // console.log(paginatedUsers);

            const name = "Thông tin tài khoản";
            // Trả về danh sách người dùng đã phân trang và các biến phân trang
            // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
           
            res.render('users/index', {
                title: name,
                taikhoan: paginatedUsers
            });

            // res.status(200).json({ data: results });
        }
    }); 
};



// Read a single user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    db.query('call getAllTaiKhoanbyId(?)', userId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Lỗi không tồn tại' });
            } else {
                const users = results[0].map((user) => {
                user.TrangThai1 = user.TrangThai == 1 ? {
                    "text": "Đang hoạt động",
                    "icon": "lni lni-checkmark",
                    "color": "inactive"
                } : {
                    "text": "Không hoạt động", 
                    "icon": "lni lni-spinner", 
                    "color": "worked"
                };
                return user;
            });
                const usersById= results[0];
                const title= 'Hiển thị';

                res.render('users/show', { usersById: results[0] ,title: title});
            }
        }
    });
};

// Update a user by ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const {
        MaNhanVien,
        TaiKhoan,
        MatKhau,
        NgayBatDau,
        NgayKetThuc,
        TrangThai,
        LoaiQuyen
    } = req.body;

    db.query(
        'call updateTaiKhoanById(?, ?, ?, ?, ?, ?, ?, ?)', [userId, MaNhanVien, TaiKhoan, MatKhau,
            NgayBatDau, NgayKetThuc, TrangThai, LoaiQuyen
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi cập nhật ', error: err });
            } else {
                res.status(200).json({ message: 'Cập nhật thành công' });
            }
        }
    );
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query('call deleteTaiKhoanById(?)', userId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi xóa', error: err });
        } else {
            res.status(200).json({ message: 'Xóa thành công!!!' });
        }
    });

};
