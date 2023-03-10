const mongoose=require("mongoose")


const connectdb=(req,res)=>{
    try {
        mongoose.connect("mongodb+srv://fadhlirihab123:Taetae30@cluster0.btof6y0.mongodb.net/?retryWrites=true&w=majority")
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
    }
}
module.exports=connectdb