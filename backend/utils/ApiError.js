/**
 * @class ApiError
 * @extends {Error} - Extends the default Error class
 * @param {number} statusCode - HTTP Status code
 * @param {string} message - Error message
 * @param {object} errors - Error details
 * @param {string} stack - Error stack trace
 * @description Custom Error class with status code and error details
 * @example throw new ApiError(400, "Bad Request", { email: "Invalid email" });
 */

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
