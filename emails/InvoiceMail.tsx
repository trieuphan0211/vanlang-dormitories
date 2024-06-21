import { ROOM, STUDENT } from "@/types";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const InvoiceMail = ({
  data,
}: {
  data: {
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
  };
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        {data?.roomDetail ? "Hóa đơn ký túc xá Văn Lang" : "Hóa đơn vi phạm"}
      </Preview>
      <Body
        style={{
          fontFamily: '"Roboto", sans-serif',
          backgroundColor: "#ffffff",
        }}
      >
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
          <Hr style={{ margin: "15px 0 0 0", borderColor: "#ccc" }} />
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
                  {data?.roomDetail
                    ? `HÓA ĐƠN KÝ TÚC XÁ THÁNG ${data?.month}`
                    : "HÓA ĐƠN VI PHẠM"}
                </Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>
                  Họ tên: {data?.student?.fullName}
                </Text>
              </Column>
              <Column align="left">
                <Text style={{ ...resetText }}>
                  MSSV: {data?.student?.studentCode}
                </Text>
              </Column>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>
                  Phòng: {data?.roomDetail?.code}
                  {data?.roomDetail?.RoomType?.name && " - "}
                  {data?.roomDetail?.RoomType?.name}
                </Text>
              </Column>
              <Column align="left">
                <Text style={{ ...resetText }}>
                  Chi nhánh: {data?.roomDetail?.Branch?.name}
                </Text>
              </Column>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>
                  Nghành: {data?.student?.major}
                </Text>
              </Column>{" "}
            </Row>{" "}
          </Section>
          {data?.detail
            ?.filter((e) => e.serviceName === "Tiền Phòng")
            .map((e, key) => (
              <Section
                style={{
                  margin: " 0 0 20px 0",
                }}
                key={key}
              >
                <Row>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",
                      fontWeight: "600",
                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>Phòng</Text>
                  </Column>

                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",
                      fontWeight: "600",
                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>Số lượng</Text>
                  </Column>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",
                      fontWeight: "600",
                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>Đơn giá</Text>
                  </Column>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",
                      fontWeight: "600",
                      width: "150px",
                      height: "30px",
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

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>
                      {data?.roomDetail?.code} -{" "}
                      {data?.roomDetail?.RoomType?.name}
                    </Text>
                  </Column>

                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>{e.quantity}</Text>
                  </Column>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>{e.unit}</Text>
                  </Column>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>
                      {e.cost.toLocaleString("en-US")}{" "}
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}

          <Section>
            <Row>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "150px",
                  height: "30px",
                }}
              >
                <Text style={{ ...resetText }}>
                  {data?.detail?.filter((e) => e.serviceName === "Tiền Phòng")
                    .length > 0
                    ? "Tên dịch vụ"
                    : "Tên hàng hóa"}
                </Text>
              </Column>

              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "150px",
                  height: "30px",
                }}
              >
                <Text style={{ ...resetText }}>Số lượng</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "150px",
                  height: "30px",
                }}
              >
                <Text style={{ ...resetText }}>Đơn giá</Text>
              </Column>
              <Column
                align="center"
                style={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  width: "150px",
                  height: "30px",
                }}
              >
                <Text style={{ ...resetText }}>Thành tiền (VND)</Text>
              </Column>
            </Row>
            {data?.detail
              ?.filter((e) => e.serviceName !== "Tiền Phòng")
              .map((e, key) => (
                <Row key={key}>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>{e.serviceName}</Text>
                  </Column>

                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>{e.quantity}</Text>
                  </Column>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>{e.unit}</Text>
                  </Column>
                  <Column
                    align="center"
                    style={{
                      border: "1px solid #000",

                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <Text style={{ ...resetText }}>
                      {e.cost.toLocaleString("en-US")}{" "}
                    </Text>
                  </Column>
                </Row>
              ))}
          </Section>
          <Section>
            <Row>
              <Column align="right">
                <Text>
                  Tổng cộng (VND):
                  <strong style={{ fontWeight: "bold" }}>
                    {" "}
                    {data?.detail
                      ?.reduce(
                        (total: number, item: any) => total + item.cost,
                        0,
                      )
                      .toLocaleString("en-US")}
                  </strong>
                </Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row>
              <Column align="center">
                <Text style={{ margin: 0, color: "red" }}>
                  Vui lòng thanh toán hóa đơn trong vòng 5 ngày kể từ ngày nhận
                  email.
                </Text>
                <Text style={{ margin: 0, color: "red" }}>Xin cảm ơn!</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={{ margin: "15px 0", borderColor: "#ccc" }} />
          <Section>
            <Row style={{ marginBottom: "5px", color: "rgba(0,0,0,0.7)" }}>
              <Column align="left" style={{ width: "50%" }}>
                <Text style={{ ...resetText }}>
                  Email: ktx.vanlangdormitories@gmail.com
                </Text>
              </Column>
              <Column align="right">
                <Text style={{ ...resetText }}>Liên hệ: 0372106260</Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
// InvoiceMail.PreviewProps = {
//   userFirstName: "Alan",
//   loginDate: new Date("September 7, 2022, 10:58 am"),
//   loginDevice: "Chrome on Mac OS X",
//   loginLocation: "Upland, California, United States",
//   loginIp: "47.149.53.167",
// };
const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};
export default InvoiceMail;
