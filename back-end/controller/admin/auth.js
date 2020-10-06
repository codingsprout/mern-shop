const User = require('../../database/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

exports.register =  (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(user) return res.status(400).json({ 
            message: 'Admin already registered!'
        });

        const { firstName, lastName, email, password } = req.body;

        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds)
        const hash_password = await bcrypt.hash(password, salt)

        const USER = new User({ 
            firstName, 
            lastName, 
            email, 
            hash_password,
            userName: shortid.generate(), 
            role: 'admin'
        });

        USER.save((error, data) => {
            if(error) {
                return res.status(400).json({ message: "Something is broken! Cero is afk..." });
            }

            if(data) {
                return res.status(201).json({ message: 'Admin created successfully!' })
            }
        });

    });
}

exports.login = (req, res)  => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if(err) return res.status(400).json({ err })
        if(user) {
            if(user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10d' })
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie('token', token, { expiresIn: '1d' })
                res.status(200).json({ token, user: { _id, firstName, lastName, email, role, fullName }})
            } else {
                return res.status(400).json({ message: 'Invalid Password' })
            }
        } else {
            return res.status(400).json({ message: 'What happened? Uh...Cero is afk!'})
        }
    })
}

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'Signed off successfully!' })
}