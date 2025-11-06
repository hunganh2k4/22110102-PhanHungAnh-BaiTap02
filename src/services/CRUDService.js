import bcrypt from "bcryptjs";
import User from "../models/user.js";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);

    const newUser = new User({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      roleId: data.roleId,
    });

    await newUser.save();

    console.log("✅ Tạo user thành công!");
    return { message: "OK create a new user successful!" };
  } catch (error) {
    console.error("❌ Lỗi tạo user:", error.message);
    throw error;
  }
};

let hashUserPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};

let getAllUser = async () => {
  try {
    const users = await User.find().lean();
    return users;
  } catch (error) {
    throw error;
  }
};


let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                _id: userId
            });
            
            if(user){
                resolve(user); //hàm trả về kết quả
            }
            else{
                resolve([]); //hàm trả về kết quả rỗng
            }
        } catch (e) {
            reject(e);
        }
    });
  }

//hàm put CRUD
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                _id: data.id //query điều kiện cho tham số
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                //lấy danh sách user
                let allusers = await User.find({});
                resolve(allusers);
            } else {
                resolve(); //hàm trả về kết quả rỗng
            }
        } catch (e) {
            reject(e);
        }
    })
  }

//hàm xóa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                _id: userId
            })
            if(user){
                await User.deleteOne({ _id: userId });
            }
            resolve(); //là return
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
    createNewUser: createNewUser
}
