import jwt from "jsonwebtoken";

//will be used in posts routes: post, patch, delete --> will have access to req.userId if logged in
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      //standard login
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      //google login
      decodedData = jwt.decode(token);
      //sub: google id that differentiate users
      req.userId = decodedData?.sub;
    }

    next()
  } catch (error) {
    console.log(error);
  }
}

export default auth
