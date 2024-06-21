import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

export const RegistrationConfirmationMail = () => {
  return (
    <Html>
      <Head />
      <Preview>Email Đăng ký ký túc xá</Preview>
      <Body style={main}>
        <Container>
          <Section style={{ padding: "30px 20px" }}>
            <Row>
              <Column align="left">
                <Img
                  width={50}
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/vanlang-6f9e0.appspot.com/o/vanlanglogo.png?alt=media&token=98528483-3fb3-4075-bd3e-98bc87c89d5c"
                  }
                />
              </Column>
              <Column align="right">
                <Img
                  width={200}
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/vanlang-6f9e0.appspot.com/o/logo.png?alt=media&token=bff9ed2d-69f1-4662-9164-04b4bacaff24"
                  }
                />
              </Column>
            </Row>
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={{
                  maxWidth: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                width={620}
                src={`https://firebasestorage.googleapis.com/v0/b/vanlang-6f9e0.appspot.com/o/bg_2_short.png?alt=media&token=8c7a9fc8-1c48-4238-af76-5ddf0cb28c5a`}
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Chào Phan Ngọc Triệu,
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Chúc mừng bạn! Đơn đăng ký của bạn đã được chấp thuận. Chào
                  mừng bạn đến với ngôi nhà chung của sinh viên Văn Lang!
                </Heading>

                <Text style={paragraph}>
                  <b>Chi Nhánh: </b>
                  Tòa I Trường đại học Văn Lang
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Phòng: </b>
                  201 - Phòng đôi
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Thời gian đăng ký: </b>
                  Thứ 2 ngày 2 tháng 10 năm 2023, 10:00 AM
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Thời gian duyệt: </b>
                  Thứ 2 ngày 2 tháng 10 năm 2023, 10:00 AM
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Lưu ý: Vui lòng đến ký túc xá trong vòng 3 ngày để nhân viên
                  ký túc xá hướng dẫn sắp xếp phòng cho bạn.
                </Text>

                <Text style={paragraph}>
                  Nếu có bất cứ thắc mắc nào, vui lòng liên hệ với chúng tôi qua
                  email{" "}
                  <Link
                    style={{
                      color: "#15c",
                      textDecoration: "underline",
                    }}
                  >
                    ktx.vanlanguni@gmail.com
                  </Link>{" "}
                  hoặc số điện thoại{" "}
                  <Link
                    style={{
                      color: "#15c",
                      textDecoration: "underline",
                    }}
                  >
                    0372 106 260
                  </Link>{" "}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Nếu bạn muốn xem chi tiết, vui lòng truy cập vào trang web của
                  ký túc xá Trường đại học Văn Lang bằng cách nhấn vào nút bên
                  dưới
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button>
                  <Link
                    style={button}
                    href="https://vanlang-dormitories.vercel.app/auth/signin"
                  >
                    Đăng Nhập{" "}
                  </Link>
                </Button>
              </Column>
            </Row>
          </Section>

          {/* <Section style={containerImageFooter}>
        <Img
          style={image}
          width={620}
          src={`${baseUrl}/static/yelp-footer.png`}
        />
      </Section> */}

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 Van Lang University. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationConfirmationMail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
