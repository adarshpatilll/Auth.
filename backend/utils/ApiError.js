class ApiError extends Error {
   constructor(statusCode, message, errors , stack = "") {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors || null;

      if (stack) {
         this.stack = stack;
      } else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}

export default ApiError;
