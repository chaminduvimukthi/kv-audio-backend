import product from "../model/product.js";

export function addProduct(req,res){
    console.log(req.user)

    //user kenekge token ek nettm return krnwa
    if(req.user == null){
        res.status(401).json({
            message : "Please logn and try again"
        })
        return;
    }

    //admin kekenek nemeinm retuen krnawa
    if(req.user.role !="admin"){
        res.status(403).json({
            message : "you are not aouthorized this action"
        })
    return
    }

    const data =req.body;
    const newProduct =new product(data);
    newProduct.save()
    .then(()=>{
        res.json({message:"Product added successfully"});
    })
    .catch((error)=>{
        res.status(500).json({error:"Product addtion failed"});
    });
}