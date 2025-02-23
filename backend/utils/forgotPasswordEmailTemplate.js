const forgotPasswordEmailTemplate = ({ name, otp }) => {
   return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forgot Password OTP</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #333333;
                    background-color: #f4f4f9;
                }

                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border: #cccccc 1px solid;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    padding-bottom: 15px;
                }

                .header {
                    text-align: center;
                    background: #4CAF50;
                    color: #ffffff;
                    padding: 20px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }

                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }

                .content {
                    text-align: center;
                    padding: 20px;
                }

                .otp {
                    font-size: 36px;
                    color: #4CAF50;
                    font-weight: bold;
                    margin: 20px 0;
                }

                .message {
                    font-size: 16px;
                    line-height: 1.5;
                }

                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #888;
                    padding: 10px;
                }

                .footer a {
                    color: #4CAF50;
                    text-decoration: none;
                }
            </style>
        </head>

        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p class="message">Dear <strong>${name}</strong>,<br />You recently requested to reset your password. Use the OTP below
                        within 1 hour to proceed:</p>
                    <p class="otp">${otp}</p>
                    <p class="message">If you did not request this, please ignore this email or contact support if you have
                        concerns.</p>
                </div>
                <div class="footer">
                    <p>Thank you for choosing Auth.!<br>Need help? Contact us at <a href="mailto:support@auth.com">support@auth.com</a></p>
                </div>
            </div>
        </body>

        </html>
    `;
};

export default forgotPasswordEmailTemplate;
