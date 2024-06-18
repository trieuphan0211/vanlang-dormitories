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
import React from "react";

const InvoiceMail = () => {
  return (
    <Html>
      <Head />
      <Preview>Invoice For Vanlang Dormitories</Preview>
      <Body
        style={{
          //   fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
          backgroundColor: "#ffffff",
        }}
      >
        {" "}
        <Container
          style={{
            margin: "0 auto",
            padding: "20px 20px 48px",
            width: "700px",
            maxWidth: "100%",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Section>
            <Row>
              <Column>
                <Img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/vanlang-6f9e0.appspot.com/o/logo_vanlang.png?alt=media&token=68d576bc-6c76-45de-bc9b-120a59eb5b87"
                  }
                  width="100"
                  height="70"
                  alt="Apple Logo"
                />
              </Column>

              <Column>
                <Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  TRƯỜNG ĐẠI HỌC VĂN LANG
                </Text>
                <Text style={{ margin: 0 }}>
                  Địa chỉ (Address): Số 45 Nguyễn Khắc Nhu, P. Cô Giang, Quận 1,
                  TP. Hồ Chí Minh
                </Text>
                <Text style={{ margin: 0 }}>
                  Mã số thuế (Tax code): 0304021964
                </Text>
                <Text style={{ margin: 0 }}>
                  Điện thoại (Tel): (028) 71099230 Ext: 3350/3351
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr style={{ margin: "15px 0 0 0", borderColor: "#000" }} />
          <Section>
            <Row>
              <Column align="center">
                <Text
                  style={{
                    color: "red",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  HÓA ĐƠN KÝ TÚC XÁ
                </Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>Họ tên: Phan Ngọc Triệu</Text>
              </Column>
              <Column align="left">
                <Text style={{ ...resetText }}>MSSV: 207TC28659</Text>
              </Column>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>Phòng: P201 - Phòng đôi</Text>
              </Column>
              <Column align="left">
                <Text style={{ ...resetText }}>
                  Chi nhánh: Tòa I Trường đại học Văn Lang{" "}
                </Text>
              </Column>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>
                  Nghành: Công nghệ thông tin
                </Text>
              </Column>{" "}
            </Row>{" "}
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left">
                <Text style={{ ...resetText }}>
                  Địa chỉ: 11/25 Tự Lập Phường 4, Quận Tân Bình, Tp. Hồ Chí Minh{" "}
                </Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Stt</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Tên hàng hóa, dịch vụ</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Đơn vị tính</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Số lượng</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Đơn giá (VND)</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Thành tiền (VND)</Text>
              </Column>
            </Row>
            <Row>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",

                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>1</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",

                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>Nước</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",

                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>
                  m<em>3</em>
                </Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",

                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>123</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",

                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>4,000 </Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",

                  width: "calc(100% / 6)",
                }}
              >
                <Text style={{ ...resetText }}>480,000</Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};
export default InvoiceMail;