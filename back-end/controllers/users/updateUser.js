import TokenGenerator from 'uuid-token-generator';
import { errorsMsg } from '../../utils/checking.js';
import { hashPwd } from '../../utils/crypt.js';
import sendMail from '../../utils/sendMail.js';
import getCity from '../../utils/geolocation.js';
import generalQuery from '../../models/generalQuery.js';
import { createToken } from '../../utils/crypt.js';
import moment from 'moment';

const updateUser = async (req, res) => {
    let {
        oldusername,
        birthday,
        username,
        firstName,
        lastName,
        gender,
        orientation,
        password,
        passwordCfm,
        tags,
        bio,

    } = req.body;

    if (!username || !password || !passwordCfm || !birthday
        || !firstName || !lastName || !gender || !orientation || !bio || !tags)
    {
        return res.send({
          success: false,
          message: "All fields must be completed."
        });
    }

    // let errors = await errorsMsg(req);
    let x = 2;

    if (x == 2)
    {
        console.log('dkhelnaaa l if');
        const user = await generalQuery.get({table: 'users', field: 'username', value: oldusername});
        console.log('ha l user diali => ' + user[0].username);
        if (user[0]) {
            const token = await createToken(user[0]);
            const location = await getCity();

            const userData = {
                oldusername,
                username,
                password: hashPwd(password),
                birthday,
                firstName,
                lastName,
                gender,
                orientation,
                password,
                passwordCfm,
                location,
                bio,
                tags
            };
            
            const fields = [];
            fields['username'] = userData.username;
            fields['password'] = userData.password;
            fields['firstName'] = userData.firstName;
            fields['lastName'] = userData.lastName;
            fields['gender'] = userData.gender;
            fields['token'] = token;
            fields['orientation'] = userData.orientation;
            fields['bio'] = userData.bio;
            // fields['tags'] = userData.tags;
            fields['lastConnection'] = moment().format('L LT');

            for (let key in fields) {
                await generalQuery.update({ table: 'users', field : key, value: fields[key], where: 'username' , whereValue: userData.oldusername });
            }
            console.log("Les infos ont été enregistrés avec succès");
            res.status(200).send({
                    success: true,
                    message: "Your account has been successfully modified.",
                    data: userData
            });
            // const data = await generalQuery.update({table: 'users', userData});
            // if (data.affectedRows > 0) {
            //     const subject = "Confirm your account";
            //     const indication = "Please click this link to confirm your account :";
            //     const link = `<a href="http://localhost:3000/activate?email=${email}&token=${confirmToken}">https://www.matcha.com/activate</a>`;
            //     sendMail(email, subject, indication, link);
            //     res.status(200).send({
            //         success: true,
            //         message: "Your account has been successfully created.\n An email has been sent to confirm your account.",
            //         data: userData
            //     });
            // }
            // else
            //     console.error("Something went wrong with the function generalQuery.insert().");
        }
        else {
            return res.send({
                success: false,
                message: "Sorry but, there is an error with the query",
            });
        }
    }
    else {
        return res.send({
          success: false,
          message: errors
        });
    }
};

module.exports = updateUser;
