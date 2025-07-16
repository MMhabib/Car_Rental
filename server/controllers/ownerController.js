import User from "../modals/User";



export const changeRoleOwner = async (req,res)=>{

    try{

        const {_id}= req.user;
        await User.findByIdAndUpdate(_id, {role:'owner'})
        res.json({sucess:true, message: 'Now you can list your cars'})
    }
    catch(error){

        console.log(error.message);
        res.json({sucess:false , message:error.message})
    }
}