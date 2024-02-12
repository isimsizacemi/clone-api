

class ApiError{
    constructor(code,message) {
        this.code = code
        this.message = message
    }


    static badRequest(msg){
        return new ApiError(400,msg)
    }

    static internal(msg){
        return new AxiosError(500,msg)

    }
}


module.export = new ApiError