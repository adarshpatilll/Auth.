const apiResponse = {
   success: (res, statusCode = 200, message = "Request Successfull", data) => {
      res.status(statusCode).json({
         success: true,
         message: message,
         data: data || null,
      });
   },
   error: (
      res,
      statusCode = 500,
      message = "Request Unsuccessfull",
      errors = []
   ) => {
      res.status(statusCode).json({
         success: false,
         message: message,
         errors: errors || null,
      });
   },
};

export default apiResponse;
