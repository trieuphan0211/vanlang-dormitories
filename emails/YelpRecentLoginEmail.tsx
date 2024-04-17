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
} from "@react-email/components";
import * as React from "react";

interface YelpRecentLoginEmailProps {
  userFirstName?: string;
  loginDate?: Date;
  loginDevice?: string;
  loginLocation?: string;
  loginIp?: string;
}

export const YelpRecentLoginEmail = ({
  fullname,
  mailBody,
}: {
  fullname: string;
  mailBody: {
    name: string;
    detail: Array<{
      serviceName: string;
      serviceId?: string;
      cost: number;
    }>;
  };
}) => {
  const total = mailBody?.detail?.reduce(
    (total: number, item: any) => total + item.cost,
    0,
  ) as number;
  return (
    <Html>
      <Head />
      <Preview>Hóa đơn ký túc xá</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}></Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Chào {fullname},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Đây là thông báo hóa đơn ký túc xá của bạn
                </Heading>
                <Text style={paragraph}>
                  <b>Phòng: </b>
                  {mailBody.name}
                </Text>
                {mailBody.detail?.map((detail: any, index: number) => (
                  <Text key={index} style={paragraph}>
                    <b>{detail.serviceName}: </b>
                    {detail.cost.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    VNĐ
                  </Text>
                ))}

                <Text style={paragraph}>
                  <b>Tổng hóa đơn: </b>
                  {total?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  VNĐ
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}>Learn More</Button>
              </Column>
            </Row>
          </Section>

          {/* <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.yelp.com
          </Text> */}
        </Container>
      </Body>
    </Html>
  );
};

YelpRecentLoginEmail.PreviewProps = {
  userFirstName: "Alan",
  loginDate: new Date("September 7, 2022, 10:58 am"),
  loginDevice: "Chrome on Mac OS X",
  loginLocation: "Upland, California, United States",
  loginIp: "47.149.53.167",
} as YelpRecentLoginEmailProps;

export default YelpRecentLoginEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

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

const boxInfos = {
  padding: "20px",
};
