import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const auth = asyncHandler(async (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1];

   if (!token) {
      throw new ApiError(401, "You need to login first");
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decoded;
   next();
});

export default auth;
