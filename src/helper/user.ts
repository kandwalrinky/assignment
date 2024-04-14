import jwt from 'jsonwebtoken'
const generateAccessToken = async (salt: object) => {

    // Create token
    const accessToken = await jwt.sign(
        salt,
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRE,
        }
    );
    return accessToken;
}
const validateAccessToken = async (token: string) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN_SECRET) as IToken;
        return decoded;
    } catch (err) {
        return false;
    }
}


interface IToken {
    id: any;
    email:any;
}


export { generateAccessToken, validateAccessToken }