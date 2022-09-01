import jwt from 'jsonwebtoken';




export const checkAuth =(req,res,next)=>{
    const token =req.headers.authorization.slice(7)
    console.log(token,' in check');
    try{
        if(token){
            const dec = jwt.verify(token,process.env.JWT_SECRET)
            console.log(dec);
            req.userid=dec.id
           next()
        
          }else{
           return res.json({message:'No access'})
          }
    }catch(err){
        return res.json({message:'No access'})
    }
   
}