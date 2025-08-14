
const validateRequest = (schema) => {
    return (req,res,next) => {
        const {error,value} = schema.validate(req.body,{abortEarly:false})

        if(error){
            return res.status(400).json({
                status: "error",
                message: "Validation Failed",
                errors: error.details.map((err) => err.message)
            })
        }

        req.body = value
        next()
    }
}

module.exports = {validateRequest}