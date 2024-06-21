import InvoiceMail from "@/emails/InvoiceMail";
import RegisterMail from "@/emails/RegisterMail";
import RegistrationConfirmationMail from "@/emails/RegistrationConfirmationMail";
import ViolateMail from "@/emails/ViolateMail";
import { REGISTER, ROOM, STUDENT, VIOLATE } from "@/types";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

// config mail server from gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trieuphan0211@gmail.com",
    pass: "raveriqsisbzhtvz",
  },
});
// config mail server from Ethereal email
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "lenore.schoen@ethereal.email",
//     pass: "T568a4ps4TprxRJRDZ",
//   },
// });
export const sendInvoiceEmail = async (data: {
  roomDetail?: ROOM;
  student: STUDENT;
  detail: Array<{
    serviceName: string;
    quantity: number;
    unit: string;
    serviceId?: string;
    cost: number;
  }>;
  month?: string;
}) => {
  console.log("Send invoice to:", data.student.email);

  const emailHtml = render(<InvoiceMail data={data} />);

  const options = {
    from: "trieuphan0211@gmail.com",
    to: data.student.email,
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
export const sendViolateEmail = async (violate: VIOLATE) => {
  console.log("Send mail violate to:", violate?.Student?.email);
  const emailHtml = render(<ViolateMail violate={violate} />);
  const options = {
    from: "trieuphan0211@gmail.com",
    to: violate.Student?.email,
    subject: "Thông báo vi phạm ký túc xá",
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
export const sendRegisterEmail = async (register: any) => {
  console.log("Send mail violate to:", register.studentEmail);
  const emailHtml = render(<RegisterMail />);
  const options = {
    from: "trieuphan0211@gmail.com",
    to: register.studentEmail,
    subject: "Thông báo đã đăng ký ký túc xá",
    html: emailHtml,
  };
  try {
    const responseMail = await transporter.sendMail(options);
    console.log("Email register sent: %s", responseMail.messageId);
    return responseMail;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
export const sendRegisterConfirmationEmail = async (student: any) => {
  console.log("Send mail violate to:", student.email);
  const emailHtml = render(<RegistrationConfirmationMail />);
  const options = {
    from: "trieuphan0211@gmail.com",
    to: student.email,
    subject: "Thông báo đơn đăng ký đã được duyệt",
    html: emailHtml,
  };
  try {
    const responseMail = await transporter.sendMail(options);
    console.log("Email register sent: %s", responseMail.messageId);
    return responseMail;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
