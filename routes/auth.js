var express = require('express');
var router = express.Router();
let userController = require('../controllers/users')
let { RegisterValidator, handleResultValidator } = require('../utils/validatorHandler')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let {checkLogin} = require('../utils/authHandler')
/* GET home page. */
router.post('/register', RegisterValidator, handleResultValidator, async function (req, res, next) {
    let newUser = userController.CreateAnUser(
        req.body.username,
        req.body.password,
        req.body.email,
        "69aa8360450df994c1ce6c4c"
    );
    await newUser.save()
    res.send({
        message: "dang ki thanh cong"
    })
});
router.post('/login', async function (req, res, next) {
    let { username, password } = req.body;
    let getUser = await userController.FindByUsername(username);
    if (!getUser) {
        res.status(403).send("tai khoan khong ton tai")
    } else {
        if (getUser.lockTime && getUser.lockTime > Date.now()) {
            res.status(403).send("tai khoan dang bi ban");
            return;
        }
        if (bcrypt.compareSync(password, getUser.password)) {
            await userController.SuccessLogin(getUser);
            let token = jwt.sign({
                id: getUser._id
            },"secret",{
                expiresIn:'30d'
            })
            res.send(token)
        } else {
            await userController.FailLogin(getUser);
            res.status(403).send("thong tin dang nhap khong dung")
        }
    }

});
router.get('/me',checkLogin,function(req,res,next){
    res.send(req.user)
})

// Change password endpoint
const { body } = require('express-validator')
router.put('/changepassword',
    checkLogin,
    body('newpassword').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
    }).withMessage('Mật khẩu mới phải đủ mạnh!'),
    async function(req, res, next) {
        const { oldpassword, newpassword } = req.body;
        const user = req.user;
        const bcrypt = require('bcrypt');
        // Kiểm tra dữ liệu đầu vào
        if (!oldpassword || !newpassword || !user || !user.password) {
            return res.status(400).send({ message: 'Thiếu dữ liệu!' });
        }
        // Kiểm tra oldpassword
        if (!bcrypt.compareSync(oldpassword, user.password)) {
            return res.status(400).send({ message: 'Mật khẩu cũ không đúng!' });
        }
        // Hash và cập nhật mật khẩu mới
        user.password = bcrypt.hashSync(newpassword, 10);
        await user.save();
        res.send({ message: 'Đổi mật khẩu thành công!' });
    }
)

module.exports = router;
