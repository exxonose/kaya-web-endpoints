import response from '../middlewares/response';

class tokenChecker {
    static checker(req, res, next) {
        const token = req.header.autorization;
        if(!token) {
            return response.errorResponse(
                res, 401, 'You are not signed in'
            )
        }
        return next()
    }
}

export default tokenChecker;
