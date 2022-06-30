import Joi from "@hapi/joi"

function registerValidate(data){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(6).max(50).email(),
        password: Joi.string().required().min(6).max(100),
    })
    return schema.validate(data)
}

function loginValidate(data){
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(50),
        password: Joi.string().required().min(6).max(100), 
    })
    return schema.validate(data)
}
export {registerValidate,loginValidate}