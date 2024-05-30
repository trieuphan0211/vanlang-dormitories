import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import * as React from "react";
import YelpRecentLoginEmail from "@/emails/YelpRecentLoginEmail";

export const sendInvoiceEmail = async (
  email: string,
  fullname: string,
  mailBody: {
    name: string;
    detail: Array<{
      serviceName: string;
      serviceId?: string;
      cost: number;
    }>;
  },
) => {
  console.log("Send to:", email);
  // config mail server from gmail
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "trieuphan0211@gmail.com",
  //     pass: "onxllpvzqjyrgtaj",
  //   },
  // });
  // config mail server from Ethereal email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "marisa.quigley@ethereal.email",
      pass: "XJbne4r2yHpHXKMDfb",
    },
  });

  const emailHtml = render(
    <YelpRecentLoginEmail fullname={fullname} mailBody={mailBody} />,
  );

  const options = {
    from: "trieuphan0211@gmail.com",
    to: email,
    subject: "Hóa đơn ký túc xá",
    html: emailHtml,
  };
  try {
    const responseMail = await transporter.sendMail(options);
    console.log("Email sent: %s", responseMail.messageId);
    return responseMail;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
