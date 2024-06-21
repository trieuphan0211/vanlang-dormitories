import { VIOLATE } from "@/types";
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
const weekday = [
  "Chủ nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];
export const ViolateMail = ({ violate }: { violate: VIOLATE }) => (
  <Html>
    <Head />
    <Preview>Đơn vi phạm</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row style={{ padding: "10px 20px" }}>
            {" "}
            <Column align="left">
              <Img
                width={200}
                src={
                  "https://firebasestorage.googleapis.com/v0/b/vanlang-6f9e0.appspot.com/o/logo.png?alt=media&token=bff9ed2d-69f1-4662-9164-04b4bacaff24"
                }
              />
            </Column>
            <Column align="right">
              <Img
                width={50}
                src={
                  "https://firebasestorage.googleapis.com/v0/b/vanlang-6f9e0.appspot.com/o/vanlanglogo.png?alt=media&token=98528483-3fb3-4075-bd3e-98bc87c89d5c"
                }
              />
            </Column>
          </Row>
        </Section>

        <Section style={paragraphContent}>
          <Hr style={hr} />
          <Text style={heading}>HÀNH VI VI PHẠM TẠI KÝ TÚC XÁ</Text>
          <Text style={paragraph}>Chào {violate?.Student?.fullName},</Text>
          <Text style={paragraph}>
            Bạn vừa bị lập vi phạm do hành vi `{violate?.TypeViolate?.name}`. Để
            biết thêm chi tiết, vui lòng tham khảo chi tiết vi phạm dưới đây:
          </Text>
          <Text style={paragraph}>
            <b>Tên vi phạm: </b>
            {violate?.TypeViolate?.name}
          </Text>

          <Text style={{ ...paragraph, marginTop: -5 }}>
            <b>Ngày lập vi phạm: </b>
            {violate?.date &&
              weekday[new Date(violate?.date).getUTCDay()] +
                " - " +
                new Date(violate?.date).getDate() +
                "/" +
                (new Date(violate?.date).getMonth() + 1) +
                "/" +
                new Date(violate?.date).getFullYear()}
          </Text>
          <Text style={paragraph}>
            <b>Hình thức xử lý: </b>
            {violate?.formProcessing === "REMINDED" && "NHẮC NHỞ"}
            {violate?.formProcessing === "WARNING" && "CẢNH CÁO"}
            {violate?.formProcessing === "LABORPENALTY" && "XỬ PHẠT LAO ĐỘNG"}
            {violate?.formProcessing === "DORMITORYEXPULSION" &&
              "RỜI KÝ TÚC XÁ"}
            {/* {"( "}Bạn sẽ bị trừ điếm {violate?.TypeViolate?.point || 0} trong
            tổng 10 điểm của tháng này {" )"} */}
          </Text>

          <Text style={paragraph}>
            <b>Điểm hiện tại: </b>
            {violate?.Student?.point}
          </Text>
          <Text
            style={{
              color: "red",
              fontSize: 14,
              marginTop: -5,
            }}
          >
            *Lưu ý:{" "}
            {violate?.Student?.point === 0
              ? "Để đảm bảo quy trình rời khỏi ký túc xá được thực hiện một cách trơn tru, vui lòng hoàn tất việc chuẩn bị và bàn giao phòng cho nhân viên trong vòng 5 ngày tới. Xin cảm ơn sự hợp tác của bạn."
              : "Nếu điểm của tháng này bằng 0 thì bạn sẽ bị đuổi khỏi ký túc xá."}
          </Text>
          <Text style={paragraph}>
            Để tránh các vi phạm tiếp theo và duy trì môi trường sống lành mạnh,
            vui lòng tham khảo nội quy của ký túc xá tại{" "}
            <Link
              href="https://vanlang-dormitories.vercel.app/rules"
              style={link}
            >
              đây
            </Link>
            .
          </Text>
        </Section>
        <Section style={paragraphList}>
          <Text style={paragraph}>
            Nếu có bất kỳ câu hỏi hoặc cần thêm thông tin, vui lòng liên hệ với
            ban quản lý ký túc xá.
          </Text>
        </Section>

        <Section style={paragraphContent}>
          <Text style={paragraph}>Trân trọng,</Text>
          <Text style={{ ...paragraph, fontSize: "20px" }}>
            Ban quản lý ký túc xá
          </Text>
        </Section>

        <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 Van Lang University. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ViolateMail;

const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const sectionLogo = {
  padding: "0 40px",
};

const headerBlue = {
  marginTop: "-1px",
};

const container = {
  margin: "30px auto",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};

const containerContact = {
  backgroundColor: "#f0fcff",
  width: "90%",
  borderRadius: "5px",
  overflow: "hidden",
  paddingLeft: "20px",
};

const heading = {
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: "700",
  color: "#004dcf",
};

const paragraphContent = {
  padding: "0 40px",
};

const paragraphList = {
  paddingLeft: 40,
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const link = {
  ...paragraph,
  color: "#004dcf",
};

const hr = {
  borderColor: "#e8eaed",
  margin: "20px 0",
};

const footer = {
  maxWidth: "100%",
};
