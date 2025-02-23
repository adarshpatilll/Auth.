import ApiError from "./../utils/ApiError.js";
import apiResponse from "./../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
   console.error("ErrorHandler:", err);

   if (err instanceof ApiError) {
      return apiResponse.error(res, err.statusCode, err.message, err.errors);
   }

   return apiResponse.error(res, 500, "Internal Server Error", err);
};

export default errorHandler;
