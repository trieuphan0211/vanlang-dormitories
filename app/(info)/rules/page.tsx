import { content } from "html2canvas/dist/types/css/property-descriptors/content";
import { Metadata } from "next";
import { title } from "process";

interface rules {
  header: string;
  body: {
    chapter: string;
    body?: string;
    article: {
      title: string;
      body?: string;
      content?: {
        title: string;
        body?: string;
        content?: {
          title: string;
        }[];
      }[];
    }[];
  }[];
}

const rules: rules = {
  header:
    "quy định /n quản lý sinh viên nội trú tại ký túc xá /n trường đại học văn lang",
  body: [
    {
      chapter: "CHƯƠNG I /n QUY ĐỊNH CHUNG",
      article: [
        {
          title: "Điều 1. Phạm vi điều chỉnh và đối tượng áp dụng",

          content: [
            {
              title:
                "Quy chế này quy định việc quản lý sinh viên nội trú tại ký túc xá Trường Đại học Văn Lang.",
            },
            {
              title:
                "Quy chế này áp dụng đối với sinh viên được trường bố trí ở trong ký túc xá  theo hồ sơ đăng ký nội trú của sinh viên.",
            },
          ],
        },
        {
          title: "Điều 2. Vị trí, chức năng của ký trúc xá",
        },
      ],
    },
    {
      chapter: "CHƯƠNG II /n THỦ TỤC ĐĂNG KÝ NỘI TRÚ",
      article: [
        {
          title: "Điều 3. Tiếp nhận sinh viên vào ở nội trú",
          body: "Căn cứ đơn xin ở nội trú của sinh viên viết theo mẫu của ban quản lý ký túc xá, Ban quản lý ký túc xá phỏng vấn trực tiếp sinh viên. Tùy theo khả năng bố trí chổ  trong ký túc xá và căn cứ vào hồ sơ xin nội trú của sinh viên, ban quản lý ký túc xá quyết định danh sách sinh viên nội trú theo thứ tự ưu tiên. Hồ sơ đăng ký nội trú với ban quản lý ký túc xá chỉ có giá trị trong thời gian ở tại ký túc xá",
        },
        {
          title: "Điều 4. Đối tượng ưu tiên tiếp nhận ở nội trú",
          body: "Khi tiếp nhận sinh viên vào ở nội trú, trong một số trường hợp số người có  nguyện vọng vào ở nội trú lớn hơn khả năng tiếp nhận của khu nội trú thì thứ tự ưu  tiên theo đối tượng sinh viên như sau:",
          content: [
            {
              title:
                "Sinh viên là anh hùng lực lượng vũ trang nhân dân, anh hùng lao động, thương binh, bệnh binh, người hưởng chính sách như thương binh, sinh viên khuyết tật.",
            },
            {
              title:
                "Con thương binh, liệt sỹ, con bệnh binh, con của người hưởng chính sách như thương binh, con người có công.",
            },
            {
              title:
                "Sinh viên thường trú tại vùng cao, vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn.",
            },
            {
              title: "Sinh viên có cha hoặc mẹ là người dân tộc tiểu số.",
            },
            {
              title: "Sinh viên mồ côi cả cha và mẹ.",
            },
            {
              title:
                "Sinh viên là con hộ nghèo, cận nghèo theo quy định hiện hành của Nhà nước.",
            },
            {
              title:
                "Sinh viên là con của cán bộ, nhân viên trường Đại học Văn Lang hoặc con của cán bộ, nhân viên thuộc Tập đoàn giáo dục Văn Lang.",
            },
            {
              title: "Sinh viên đạt học bổng toàn bộ học phí của nhà Trường.",
            },
            {
              title:
                "Sinh viên tham gia tích cực các hoạt động do nhà trường, Đoàn TNCS Hồ Chí Minh, Hội sinh viên hoặc tham gia các công tác tổ chức xã hội.",
            },
          ],
        },
        {
          title: "Điều 5. Thủ tục đăng ký nội trú",
          body: "Sinh viên có nguyện vọng ở nội trú phải nộp hồ sơ đăng ký nội trú với Ban quản lý ký túc xá.",
          content: [
            {
              title: "Đối với sinh viên xin nội trú lần đầu, hồ sơ bao gồm:",
              content: [
                {
                  title: "Đơn xin vào ở nội trú (theo mẫu) và 03 ảnh 3x4.",
                },
                {
                  title: "Sơ yếu lý lịch cá nhân.",
                },
                {
                  title: "Bản sao CMND hoặc CCCD",
                },
                {
                  title:
                    "Các giấy tờ chứng nhận thuộc đối tượng ưu tiên (nếu có).",
                },
                {
                  title:
                    "Bản sao Giấy báo nhập học (nếu là sinh viên năm nhất) hoặc Thẻ sinh viên (nếu là sinh viên năm 2 trở lên).",
                },
              ],
            },
            {
              title:
                "Đối với những sinh viên đã bố trí ở nội trú, khi hồ sơ đăng ký nội trú hết hạn phải tự giác đến báo và đăng ký lại ở học kỳ sau hoặc năm học sau theo thông báo của ký túc xá. Những sinh viên ở nội trú năm trước nếu không chấp hành tốt quy chế ký túc xá sẽ không được ở năm tiếp theo.",
            },
            {
              title:
                "Trong thời hạn 3 ngày kể từ ngày sinh viên được chấp nhận nội trú, Ban quản lý ký túc xá phải tổ chức cho sinh viên làm hồ sơ đăng ký nội trú.",
            },
          ],
        },
        {
          title: "Điều 6. Thủ tục chấm dứt hồ sơ nội trú",
          content: [
            {
              title:
                "Đối với sinh viên hết thời gian nội trú: Sinh viên báo cáo với Ban quản lý ký túc xá, viết đơn chấm dứt hồ sơ nội trú và bàn giao tài sản.",
            },
            {
              title:
                "Đối với sinh viên vi phạm nội quy ký túc xá bị xử kỷ luật: Ban quản lý ký túc xá thông báo cho sinh viên buộc thôi ở ký túc xá, sinh viên bàn giao thẻ nội trú và bàn giao tài sản.",
            },
          ],
        },
      ],
    },
    {
      chapter: "CHƯƠNG III/n QUYỀN VÀ NGHĨA VỤ CỦA SINH VIÊN NỘI TRÚ",
      article: [
        {
          title: "Điều 7. Quyền và nghĩa vụ của sinh viên nội trú",
          content: [
            {
              title: "Sinh viên nội trú có quyền:",
              content: [
                {
                  title:
                    "Sinh viên nội trú được quyền nội trú, tự học, sinh hoạt trong ký túc xá theo đúng hồ sơ đăng ký; được quyền sử dụng các trang thiết bị do ký túc xá cung cấp cho việc ở, học tập và sinh hoạt; được sử dụng các dịch vụ tiện ích khác trong khuôn viên nhà trường (phòng gym, hồ bơi, khu thể thao phức hợp,…)",
                },
                {
                  title:
                    "Được đảm bảo an ninh, trật tự, an toàn vệ sinh môi trường trong khu nội trú.",
                },
                {
                  title:
                    " Được quyền khiếu nại hoặc yêu cầu đên Ban quản lý Ký túc xá hoặc Ban Giám hiệu về những vấn đề liên quan đến công tác sinh viên nội trú.",
                },
              ],
            },
            {
              title: "Sinh viên nội trú có nghĩa vụ:",
              content: [
                {
                  title:
                    "Nộp đủ và đúng thời hạn phí nội trú và tiền cọc theo quy định. Những sinh viên nội trú ",
                },
                {
                  title: "Thực hiện đúng quy định về đăng ký tạm trú.",
                },
                {
                  title:
                    "Chịu trách nhiệm bồi thường những hư hỏng, mất maát do mình gây ra đối với các trang thiết bị của Ký túc xá.",
                },
                {
                  title: "Tự bảo quản tư trang, đồ đạc cá nhân.",
                },
                {
                  title:
                    "Tiết kiệm điện, nước, phòng chống cháy nổ, có ý thức giữ gìn và bảo vệ tài sản chung trong khu nội trú.",
                },
                {
                  title:
                    "Phản ánh kịp thời các vụ việc xảy ra trong khu nội trú liên quan đến sinh viên vi phạm nội quy, quy chế và các đề xuất, kiến nghị chính đáng với Ban quản lý Ký túc xá.",
                },
              ],
            },
          ],
        },
        {
          title:
            "Điều 8. Các quy định về an ninh, trật tự và vệ sinh trong ký túc xá",
          body: "Sinh viên nội trú phải chấp hành đúng các quy định về trật tự và vệ sinh trong ký túc xá như sau:",
          content: [
            {
              title:
                " Hoàn thành nhiệm vụ trực phòng theo lịch phân công. Tham gia đầy đủ kế hoạch làm vệ sinh môi trường của ký túc xá.",
            },
            {
              title:
                "Quần áo tư trang, chăn màn, đồ dùng cá nhân, sách vở phải để gọn gàng ngăn nắp đúng nơi quy định phòng ở.",
            },
            {
              title:
                "Sử dụng đúng mục đích, đúng quy định các trang thiết bị do Ký túc xá cung cấp hoặc được phép sử dụng. Kiểm tra tắt hết các thiết bị điện, nước trước khi ra khỏi phòng ở Ký túc xá",
            },
            {
              title:
                "Chấp hành quy định của khu nội trú về việc tiếp khách trong phòng ở, giờ tự học, tổ chức sinh hoạt văn hóa, văn nghệ, không gây ảnh hưởng đến việc học tập, sinh  hoạt của sinh viên khác trong phòng ở và khu nội trú.",
            },
            {
              title:
                "Chấp hành nghiêm túc chế độ sinh hoạt của Ký túc xá: Giờ mở cửa cửa 5h, giờ đóng cửa 22h.",
            },
            {
              title:
                "Chỉ được tiếp khách đúng nơi quy định và phải được sự đồng ý của Ký túc xá. Không giải quyết các trường hợp tiếp khách sau 22:00’ mỗi ngày. Chỉ được sử dụng các phòng sinh hoạt chung theo đúng quy định (học tập, đọc sách, nghiên cứu nhóm, sinh hoạt văn hóa văn nghệ).",
            },
            {
              title:
                "Tự ý sữa chữa, cải tạo phòng ở, không di chuyển trang thiết bị, vật dụng của ký túc xá khỏi vị trí đã bố trí; gây mất trật tự, an ninh; viết vẽ, che chắn làm mất mỹquan trong phòng ở và khu sinh hoạt chung ở khu nội trú",
            },
          ],
        },
        {
          title: "Điều 9. Các hành vi bị nghiêm cấm",
          content: [
            {
              title:
                "Tự ý sữa chữa, cải tạo phòng ở, không di chuyển trang thiết bị, vật dụng của ký túc xá khỏi vị trí đã bố trí; gây mất trật tự, an ninh; viết vẽ, che chắn làm mất mỹquan trong phòng ở và khu sinh hoạt chung ở khu nội trú.",
            },
            {
              title: "Chuyển nhượng hoặc cho thuê ở lại chỗ nội trú.",
            },
            {
              title:
                "Sản xuất, tàng trữ, sử dụng, buôn bán, vận chuyển, phát tán các loại vũ khí, các chất gây cháy, gây nổ, hóa chất độc hại, ma túy, các loại rượu, bia và các chế phẩm của ma túy, các tài liệu, ấn phẩm, phim ảnh, thông tin phản động, đồi trụy và các tài liệu khác bị cấm theo quy định của Nhà nước; tổ chức hoặc tham gia đánh bạc, mại dâm dưới mọi hình thức.",
            },
            {
              title:
                "Gây gỗ, đánh nhau, tổ chức băng nhóm, phe phái tụ tập, gây rối an ninh trật tự.",
            },
            {
              title:
                "Có hành vi trộm cắp hoặc phá hoại tài sản; sử dụng tài sản công không đúng mục đích,…",
            },
            {
              title: "Đưa người lạ vào phòng của mình.",
            },
            {
              title:
                "Có hành động, tác phong thiếu văn hóa gây mất trật tự, gây ô nhiễm môi trường.",
            },
            {
              title:
                "Truyền bá các hoạt động mê tín dị đoan, các hoạt động tôn giáo trái phép trong khu ký túc xá.",
            },
            {
              title:
                "Tổ chức, liên kết, tham gia các hoạt động trên không gian mạng xã hội xâm hại đến an ninh quốc gia, bí mật nhà nước, trật tự an toàn xã hội, quyền và lợi ích hợp pháp của tổ chức, cá nhân.",
            },
          ],
        },
        {
          title: "Điều 10. Các tổ chức sinh viên trong Ký túc xá",
          content: [
            {
              title: "Phòng trưởng",
              body: "Phòng trưởng do sinh viên trong phòng bầu ra dươis sự giám sát của nhà Trường. Phòng trưởng có nhiệm vụ như sau:",
              content: [
                {
                  title:
                    "Tổ chức sinh hoạt tập thể về học tập, vệ sinh, an ninh trật tự bảo vệ tài sản phòng ở.",
                },
                {
                  title: "Chịu trách nhiệm về mọi hoạt động trong phòng ở.",
                },
                {
                  title:
                    "Nhắc nhở, đôn đốc các thành viên trong phòng thực hiện nghiêm túc quy định, nội quy ký túc xá và nội quy của nhà trường.",
                },
                {
                  title:
                    "Phản ánh những bức xúc, yêu cầu, nguyện vọng chính đáng của các cá nhân trong phòng đên Ban quản lý ký túc xá..",
                },
                {
                  title:
                    "Kịp thời thông báo cho người có trách nhiệm và tham gia giải quyết các vụ việc xảy ra trong ký túc xá.",
                },
              ],
            },
            {
              title: "Ban tự quản",
              body: "Ban tự quản Ký túc xá là cầu nối giữa sinh viên đối với cán bộ, nhân viên Ký túc xá. Truyền đạt những yêu cầu, nguyện vọng chính đáng của sinh viên, đồng thời phối hợp, hỗ trợ các hoạt động, nhắc nhở, theo dõi, đôn đốc sinh viên thực hiện các thông báo, quy chế của Ký túc xá, cụ thể như sau:",
              content: [
                {
                  title:
                    "Phối hợp cùng các phòng trưởng tổ chức tự quản trong sinh viên.",
                },
                {
                  title:
                    "Chủ động phát hiện những vị trí, những thiết bị, tài sản, trang bị, nguồn lực,…  của Ký túc xá có khả năng bị xâm hại, sử dụng sai mục đích, sai quy định để có kế hoạch ngăn ngừa khả năng vi phạm.",
                },
                {
                  title:
                    "Quan sát, trực, tuần tra để nhanh chóng phát hiện các vi phạm trong và ngoài phòng ở, khuôn viên Ký túc xá. ",
                },
                {
                  title:
                    "Cùng phòng trưởng tiến hành xử lý sơ bộ và báo cáo với Ban quản lý Ký túc xá để chỉ đạo xử lý sự việc.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      chapter: "CHƯƠNG IV/n XỬ LÝ KỶ LUẬT VI PHẠM NỘI QUY KÝ TÚC XÁ",
      body: "Sinh viên Trường Đại học Văn Lang không chấp hành nội quy Ký túc xá sẽ bị xử lý kỷ luật vi phạm bằng các hình thức sau:",
      article: [
        {
          title: "",
          content: [
            {
              title:
                "Về Ký túc xá sau 23 giờ 00 nhưng không có lí do chính đáng. ",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
            {
              title:
                "Ra, vào ký túc xá không theo cửa qui định như: Trèo tường, phá cửa, phá hoa sắt hành lang hoặc cửa sổ; tự động đánh chìa khoá cửa: Cảnh cáo bồi thường tài sản bị hư hỏng. ",
            },
            {
              title: "Nấu ăn dưới mọi hình thức:",
              body: "Lần 1: Khiển trách, thu phương tiện./nLần 2: Cảnh cáo.",
            },
            {
              title:
                "Đưa người ngoài danh sách vào ở trong phòng, sau 23 giờ không trình báo:",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
            {
              title:
                " Đưa người khác giới vào ngủ tại phòng: Cảnh cáo và không được ở ký túc xá. ",
            },
            {
              title: "Tự ý di chuyển chỗ ở: ",
              body: "Lần 1 : Khiển trách, buộc phải về nơi ở cũ./nLần 2 : Cảnh cáo. ",
            },
            {
              title:
                "Tự ý cho người ngoài danh sách vào ở thay chỗ của mình: Cảnh cáo và không được ở ký túc xá. ",
            },
            {
              title:
                "Làm mất vệ sinh trong phòng ở, đổ nước, vứt rác qua cửa sổ, cầu thang, hành lang và nơi công cộng: ",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
            {
              title: "Đi vệ sinh không đúng nơi qui định: ",
              body: "Lần 1: Khiển tráchh, dọn vệ sinh.  /n Lần 2: Cảnh cáo.",
            },
            {
              title:
                "Tự ý di chuyển tài sản trong phòng ở, viết vẽ lên tường, làm hư hỏng tài sản của trường: Trả tài sản về nơi ở cũ, sơn lại tường; tuỳ theo mức độ phải bồi thường và chịu hình thức kỷ luật từ khiển trách đến buộc ra khỏi ký túc xá.",
            },
            {
              title: "Uống rượu, bia:",
              body: "Lần 1: Khiển trách. /nLần 2: Cảnh cáo.Uống rượu, bia gây mất trật tự; gây gổ đánh nhau: Từ cảnh cáo đến buộc ra khỏi ký túc xá. ",
            },
            {
              title: "Sử dụng các phương tiện tiêu khiển sau 23 giờ: ",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
            {
              title:
                "Đánh bài ăn tiền dưới mọi hình thức: Lập biên bản và chuyển giao Cơ quan chức năng xử lý theo qui định của Pháp luật (Hình thức kỷ luật tuỳ thuộc kết luận của cơ quan chức năng: Từ cảnh cáo đến buộc ra khỏi ký túc xá). ",
            },
            {
              title:
                "La hét, tiếng ồn, gây mất trật tự dưới mọi hình thức trong ký túc xá:",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
            {
              title:
                " Chứa chấp, môi giới, hoạt động mại dâm, ma tuý; tàng trữ và sử dụng các loại vũ khí vũ khí, chất nổ, chất cháy, đốt pháo; tàng trữ và văn hoá phẩm đồi truỵ: Lập biên bản và chuyển giao Cơ quan chức năng xử lý theo qui định của Pháp luật (Hình thức kỷ luật tuỳ thuộc kết luận của cơ quan chức năng: Từ cảnh cáo đến buộc ra khỏi ký túc xá). ",
            },
            {
              title:
                "Đưa phần tử xấu vào ký túc xá, ăn cắp, trấn lột, đánh người: Tuỳ theo mức độvi phạm mà chịu kỷ luật từ cảnh cáo đến buộc buộc ra khỏi ký túc xá và bàn giao cho cơ quan chức năng xử lý theo qui định của pháp luật. ",
            },
            {
              title: "Mắc nối điện trái phép:",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo./n Nếu mắc nối điện gây thiệt hại đến tài sản của cá nhân và Nhà trường thì phải đền bù và chịu các hình thức xử lý theo quy định của Pháp luật. (Tuỳ theo mức độ vi phạm)",
            },
            {
              title:
                "Để xe máy, xe đạp, các phương tiện khác trong khuôn viên ký túc xá (phòng ở và cư xá):",
              body: "Lần 1: Khiển trách. /n Lần 2: Buộc ra khỏi ký túc xá.",
            },
            {
              title: "Căng ri đô, thờ cúng, thắp hương trong ký túc xá:",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
            {
              title:
                "Đánh nhau: Tuỳ mức độ vi phạm mà chịu kỷ luật từ cảnh cáo đến buộc ra khỏi ký túc xá. ",
            },
            {
              title:
                "Không đóng tiền ở ký túc xá đúng thời gian qui định (sau 30 ngày): Cảnh cáo và không được ở ký túc xá, đồng thời phải đóng hết tiền của số tháng đã ở.22. Không trả tiền điện, nước, vệ sinh đúng hạn: Khiển trách và tạm dừng cung cấp dịch vụ trên theo qui định của Nhà trường. ",
            },
            {
              title:
                "Chơi đá bóng, tập tạ ngoài hành lang, trong phòng ở của ký túc xá: ",
              body: "Lần 1: Khiển trách. /n Lần 2: Cảnh cáo.",
            },
          ],
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Nội quy",
  description: "",
};
const RoomPage = () => {
  return (
    <main className="w-full bg-[url(/images/background/ky_tuc_xa.jpg)] p-3 font-mono font-medium text-black">
      <div className="mx-auto max-w-[1300px] rounded-lg bg-white p-7">
        <h1 className="mb-8 text-center text-4xl font-extrabold uppercase leading-snug">
          {rules.header.split("/n").map((title, index) => (
            <span key={title + index}>
              <span>{title}</span>
              <br />
            </span>
          ))}
        </h1>

        {rules.body.map((chapter, index) => (
          <div className="mt-4" key={"h2-" + index}>
            <h2 className="text-center text-2xl font-bold">
              {chapter.chapter.split("/n").map((title) => (
                <span key={"h3-" + title}>
                  <span>{title}</span>
                  <br />
                </span>
              ))}
            </h2>
            {chapter?.body && <p className="mt-2">{chapter.body}</p>}
            {chapter.article.map((article, index) => (
              <div className="mt-4" key={"h4-" + index}>
                <h3 className="text-xl font-bold">{article.title}</h3>
                {article?.body && <p className="mt-2">{article.body}</p>}
                {article.content && (
                  <ol className="list-decimal pl-10">
                    {article.content.map((content, index) => (
                      <>
                        <li className="mt-2" key={"h5-" + index}>
                          {content.title}
                        </li>
                        {content?.body && (
                          <p className="mt-2">
                            {content.body.split("/n").map((title) => (
                              <span key={"h7-" + title}>
                                <span>{title}</span>
                                <br />
                              </span>
                            ))}
                          </p>
                        )}
                        <ul className="ml-10 list-[lower-alpha]">
                          {content?.content &&
                            content?.content.map((content1, index) => (
                              <li className="mt-2" key={"h5-" + index}>
                                {content1.title}
                              </li>
                            ))}
                        </ul>
                      </>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        ))}
        <p className="mt-2">
          Sinh viên, học viên vi phạm các hình thức kỷ luật từ Cảnh cáo trở lên
          đều phải buộc ra khỏi Ký túc xá và chấm dứt ở khi quyết định kỷ luật
          có hiêụ lực. Sinh viên, học viên không chấp hành quyết định kỷ luật,
          sẽ phải chịu hình thức kỷ luật cao hơn của Nhà trường.{" "}
        </p>
        <p className="mt-2">
          Mọi vi phạm đều được xử lý theo đúng qui chế nội trú của Bộ Giáo dục &
          Đào tạo và của Nhà trường đã ban hành. Cụ thể nếu một học kỳ vi phạm 2
          lần các điều trên sẽ không được đăng ký ở nội trú Ký túc xá, thông báo
          về Khoa quản lý sinh viên. Nếu vi phạm nặng sẽ kiến nghị nhà trường
          xem xét kỷ luật
        </p>
      </div>
    </main>
  );
};

export default RoomPage;
