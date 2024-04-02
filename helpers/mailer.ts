import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b6b1b56b684af4",
        pass: "febd25f09e896d",
      },
    });
    const option = {
      from: "practice@practice.com", // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}
      </p>`, // html body
    };

    const mailResponse = await transporter.sendMail(option);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
