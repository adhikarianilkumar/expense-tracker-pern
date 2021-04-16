const pool = require("../config/db");
const bcrypt = require('bcryptjs');

// @desc    User registration
// @route   POST api/v1/user/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { first_name, middle_name, last_name, email, phone_number, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT id, first_name, middle_name, last_name, email, phone_number, password FROM user_registration WHERE email = $1",
        [email]);
        
        if(user.rows.length > 0){
            return res.status(400).json({
                success: false,
                error: `OOPS!! Email does not exists.`
            });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userDetails = await pool.query(
            "INSERT INTO user_registration (first_name, middle_name, last_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [first_name, middle_name, last_name, email, phone_number, hashedPassword]
          );

        return res.status(201).json({
            success: true,
            data: userDetails.rows[0]
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}

// @desc    User login
// @route   POST api/v1/user/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, phone_number, password } = req.body;

        const user = await pool.query(`SELECT id, first_name, middle_name, last_name, email, phone_number, password 
        FROM user_registration 
        WHERE email = $1 OR phone_number = $2`,
        [email, phone_number]
        );

        // Check if password is correct
        const isValidPass = await bcrypt.compare(password, user.rows[0].password);
        if(isValidPass){
            return res.status(201).json({
                success: true,
                data: 'Logged in Successfully.'
            });
        } else {
            return res.status(201).json({
                success: false,
                data: 'OOPS!! Username or Password did not match.'
            });
        }

        
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}


// @desc    Forgot Password
// @route   POST api/v1/user/forgotPassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email, phone_number } = req.body;

        const user = await pool.query(`SELECT id, first_name, middle_name, last_name, email, phone_number, password 
        FROM user_registration 
        WHERE email = $1 OR phone_number = $2`,
        [email, phone_number]
        );

        // Check if email or phone_number is correct
        if(user.rowCount>0){
            return res.status(201).json({
                success: true,
                data: 'User exists, navigate to Security question page.'
            });
        } else {
            return res.status(201).json({
                success: false,
                data: 'OOPS!! User does not exist.'
            });
        }
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}


// @desc    Get Security Questions
// @route   POST api/v1/user/securityQuestions
// @access  Public
exports.getSecurityQuestions = async (req, res, next) => {
    try {
        const { email, phone_number } = req.body;

        const securityQuestions = await pool.query(`SELECT id, security_question, answer, email, phone_number 
        FROM user_security_questions 
        WHERE email = $1 OR phone_number = $2`,
        [email, phone_number]
        );

        return res.status(201).json({
            success: true,
            data: securityQuestions.rows
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}


// @desc    Save Security Questions
// @route   POST api/v1/user/securityQuestions
// @access  Public
exports.saveSecurityQuestions = async (req, res, next) => {
    try {
        const { email, phone_number, security_questions} = req.body;

        let buildInsertDataSting = '';

        for(let q=0; q<security_questions.length; q++){
            buildInsertDataSting += `('${security_questions[q].security_question}', '${security_questions[q].answer}', '${email}', '${phone_number}')`;
            buildInsertDataSting += (q==security_questions.length-1) ? '' : ',';
        }

        const securityQuestions = await pool.query(`INSERT INTO user_security_questions 
        (security_question, answer, email, phone_number) 
        VALUES ${buildInsertDataSting}`
        );

        return res.status(201).json({
            success: true,
            data: 'Security questions has been added successfully'
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}


// @desc    Validate Security Questions
// @route   POST api/v1/user/validateSecurityQuestions
// @access  Public
exports.validateSecurityQuestions = async (req, res, next) => {
    try {
        const { email, phone_number, security_questions} = req.body;

        const verifySecurityQuestions = await pool.query(`SELECT security_question, answer
        FROM user_security_questions 
        WHERE email = $1 OR phone_number = $2`,
        [email, phone_number]
        );

        const isValidQnAs = JSON.stringify(verifySecurityQuestions.rows) === JSON.stringify(security_questions);

        let successMsg = '';
        if(isValidQnAs){
            successMsg = 'Security questions has been verified successfully';
        } else {
            successMsg = 'OOPS! Security questions has not been verified';
        }

        return res.status(201).json({
            success: true,
            data: successMsg
        });
    } catch (err) {
        pool.end();
        if(err.name==='ValidationError'){
            const messages = Object.values(err.errors).map(val=> val.message);

            return res.status(400).json({
                success: false,
                error: messages,
                poolEnded: pool.ended
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error',
                poolEnded: pool.ended
            });
        }
    }
}