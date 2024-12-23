const asyncHandler =(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) =>next(err))
    }
}

export default asyncHandler


// const asyncHandler =(func)=>{
//     async (req,res,next)=>{
// try {
//     await func(req,res,next)
// } catch (error) {
//     res.status(error.code||500).json({
//         sucess: false,
//         message: error.message,

//     })
// }

//     }
// }