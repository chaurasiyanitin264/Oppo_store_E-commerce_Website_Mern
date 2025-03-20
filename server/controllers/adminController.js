const ProductModels=require("../models/productModels")
const CustomerorderModels=require("../models/customerOrderModel");
const AdminModel=require("../models/adminModels")
const jwt = require("jsonwebtoken");

const productSave=async(req, res)=>{  
   const { name,brand,description,price,category,subcategory }=req.body;
//    console.log(req.files)
   const imageUrls = req.files.map(file => file.path);
   const Product= await ProductModels.create({
    name:name,
    brand:brand,
    price:price, 
    description:description, 
    category:category, 
    subcategory:subcategory,
    images:imageUrls,
    defaultImage:imageUrls[0]
})
res.status(200).send("product successfully uploaded")
}


const DisplayProduct=async(req,res)=>{
    try {
        const DisplayProduct=await ProductModels.find();
        res.status(200).send(DisplayProduct)
    } catch (error) {
        console.log(error)
    }
}
const productMakePrimary=async(req, res)=>{
    const {id} = req.body;
    const Data= await ProductModels.findByIdAndUpdate(id, {status:"primary"} );
    res.status(201).send({msg:"Product Status Succesfully Changed!"});
}

const productMakeNormal=async(req, res)=>{
    const {id} = req.body;
    const Data= await ProductModels.findByIdAndUpdate(id, {status:"normal"} );
    res.status(201).send({msg:"Product Status Succesfully Changed!"});
}

const showCustomerOrder=async(req, res)=>{
    const Order= await CustomerorderModels.find();
    res.status(200).send(Order);
}

const displayAllCustomer=async(req, res)=>{
       const Customer= await CustomerorderModels.find();
       res.status(200).send(Customer);
}




const AdminLogin = async (req, res) => {
    //  console.log(req.body);
    //  res.send("OKK")
    const { adminid, password } = req.body;
    try {
      // Admin को डेटाबेस से ढूंढो
      const Admin = await AdminModel.findOne({ adminid: adminid });
  
      if (!Admin) {
        return res.status(400).json({ msg: "Invalid user Id" });
      }
  
      // यहाँ bcrypt का उपयोग किया जाएगा, जो कि पासवर्ड को सिक्योर तरीके से चेक करेगा
      // bcrypt.compare(password, Admin.password) का इस्तेमाल करें
      const isPasswordMatch = Admin.password === password; // यहाँ पासवर्ड को सिक्योर चेक करना चाहिए।
  
      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }
  
      // यदि पासवर्ड सही है, तो JWT टोकन जनरेट करें और भेजें
      const token = jwt.sign({ id: Admin._id }, process.env.TOKEN_KEY, {
        expiresIn: "3d",
      });
      res.status(200).json({ msg: "Login successful", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  // const Login = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  // const UserLogin = await UserModel.findOne({ useremail: email });
  //     if (!UserLogin) {
  //       return res.status(400).json({ msg: "Invalid Email" });
  //     }
  //     // Compare password
  //     const isMatch = await bcrypt.compare(password, UserLogin.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ msg: "Invalid Password" });
  //     }
  //     // Generate token
  //     const token = jwt.sign({ id: UserLogin._id }, process.env.TOKEN_KEY, {
  //       expiresIn: "3d", 
  //     });
  //   //  console.log(token)
  //     return res.status(200).json({token:token});
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     return res.status(500).json({ msg: "Internal Server Error" });
  //   }
  // };
  
  const adminauth=async(req,res)=>{
    const token = req.header("auth-token");
    // console.log(token)
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const admin = await AdminModel.findById(decoded.id);
    res.status(200).send(admin);
  }




// const productMakeNormal=async(req, res)=>{
//     const {id} = req.body;
//     const Data= await ProductModel.findByIdAndUpdate(id, {status:"normal"} );
//     res.status(201).send({msg:"Product Status Succesfully Changed!"});
// }


module.exports ={
    productSave,
    DisplayProduct,
    productMakePrimary,
    productMakeNormal,
    showCustomerOrder,
    displayAllCustomer,
    AdminLogin,
    adminauth,
  
}