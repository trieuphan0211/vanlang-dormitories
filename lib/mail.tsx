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
  console.log(email);
  const transporter = nodemailer.createTransport({
    host: "gmail",

    auth: {
      user: "trieuphan0211@gmail.com",
      pass: "onxllpvzqjyrgtaj",
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

  return await transporter.sendMail(options);
};
