const db = require("../../../models");
const bcrypt = require("bcryptjs");


const createUser = async (req, res) => {

        try {


    //put request data into a single object
            let newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        
    //check if user email exist in db

            let emailExist = await checkUserEmail(newUser);

            if(emailExist){
                return res.status(409).json({
                    status: "error", 
                    message: "User with this email exists.",
                });
            }else{
                
                    //for user security, password is hashed

                newUser.password = await hash(newUser.password);
                
                // Create a new user
                await db.User.create(newUser).then(results => {
                    res.status(201).json({
                        status: "success", 
                        message: "User created successfully",
                    });
                }).catch(error => {
                    res.status(409).json({
                        status: "error", 
                        message: "User could not be created.",
            
                    });
            
                });
                
            }    
            
        } catch (error) {
           return res.status(500).json({
            status: "error", 
                message: "Server encounterd some errors.",
            });            
        }

    
}


const updateUser = async (req, res, next) => {
        try {

            //find user with the id provided in the request
            const user = await db.User.findByPk(parseInt(req.body.id));
            const {name, email, password} = req.body;
            if(!user){
                return res.status(400).json({
                    status: "error", 
                    message: `User with ID ${req.body.id} does not exist in the records.`,
                });
            } 
            
            if(name) user.name = name;
            if(email) user.email = email;
            if(password) user.password = await hash(password);

            const updatePerson = await user.save();

            if(!updatePerson){
               return res.status(400).json({
                    status: "errror", 
                    message: `User with ID ${req.body.id} failed to Update.`,
                });
            } 
            return res.status(201).json({
                status: "success", 
                message: `User with ID ${req.body.id} has been updated successfully.`,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error", 
                message: `System encountered an error.`,
            });        
        }
}



const deleteUser = async (req, res) => {
    try {
        //find user with the id provided in the request
        const user = await db.User.findByPk(parseInt(req.body.id));
        if(!user){
           return res.status(400).json({
                status: "error", 
                message: `User with ID ${req.body.id} does not exist in the records.`,
            });
        } 
            //delete user

        const destroyUser = await user.destroy();

        if(!destroyUser){
            return res.status(400).json({
                status: "errror", 
                message: `User with ID ${req.body.id} failed to delete.`,
            });
        } 
        return res.status(201).json({
            status: "success", 
            message: `User with ID ${req.body.id} has been deleted successfully.`,
        });
       
    } catch (error) {
        return res.status(500).json({
            status: "error", 
            message: `System encountered an error.`,
        });        
    }
}


const getUser = async (req, res) => {
    try {
        //find user by email provided in the request

        const user = await db.User.findOne({
            where : {
                email : req.body.email
            }
        });

        if(!user){
           return res.status(400).json({
                status: "error", 
                message: `User with E-mail ${req.body.email} does not exist in the records.`,
            });
        } 
        //Proceed to match password if email exist

        const passwordMatch = await comparePwd(req.body.password, user.password);

        if(passwordMatch !== true){
            return res.status(401).json({
                status: "error", 
                message: `Wrong Email and Password combination.`,
            });
        }
        return res.status(201).json({
            status: "success", 
            message: `User with ID ${req.body.email} has been found.`,
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            status: "error", 
            message: `System encountered an error.`,
        });        
    }

}


async function checkUserEmail(data) {
        try {
            let user = await db.User.findOne({
                where: {
                    email: data.email
                }
            });
            if(user) return true;
            return false;
        } catch (error) {
            return res.status(500).json({
                status: "error", 
                message: `System encountered an error.`,
            });            }
}


async function hash(input){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(input, salt);
}

async function comparePwd(input, hash){
    // Load hash from users DB.
   return bcrypt.compare(input, hash);
}




module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
}