import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
   console.log("RESEND_API_KEY is required");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ sendTo, subject, html }) => {
   try {
      const { data, error } = await resend.emails.send({
         from: "Auth. <onboarding@resend.dev>",
         to: sendTo,
         subject: subject,
         html: html,
      });

      if (error) {
         return console.error({ sendMailError: error });
      }

      return data;
   } catch (error) {
      console.error({ error });
   }
};

export default sendEmail;
