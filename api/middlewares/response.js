class response {

    static successResponse(res, code, description, payload) {

        res.status(code).json({
            status: code,
            message: description,
            data: payload,
        })
    }


    static errorResponse(res, code, description) {
        res.status(code).json({
            status: code,
            message: description,
        })
    }
}

export default response;