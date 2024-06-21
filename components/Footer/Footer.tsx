import Image from "next/image";

export const Footer = () => {
  const info = [
    {
      title: "Về chúng tôi",
      items: [
        {
          title: "Tin tức",
          path: "https://www.vlu.edu.vn/vi/news-events/news/search",
        },
        {
          title: "Sự kiện",
          path: "https://www.vlu.edu.vn/vi/news-events/events/search",
        },
        { title: "Tuyển dụng", path: "https://www.vlu.edu.vn/career" },
        {
          title: "Đảm bảo chất lượng đào tạo",
          path: "https://www.vlu.edu.vn/vi/quality-assurance/dam-bao-chat-luong-dao-tao",
        },
      ],
    },
    {
      title: "Truy cập nhanh",
      items: [
        {
          title: "Hệ thống Văn bản",
          path: "https://vanlangunivn.sharepoint.com/sites/van-ban-so-VLU",
        },
        {
          title: "Hệ thống E-Learning",
          path: "https://elearning.vanlanguni.edu.vn/",
        },
        {
          title: "Thư viện",
          path: "https://lib.vlu.edu.vn/?_gl=1*1kfa75k*_ga*MTAxMzc4MTk3OC4xNjk5MTE1Nzkx*_ga_JJNEHZH45Q*MTcxMTY1MTMxMC4yNi4xLjE3MTE2NTI0MDQuNjAuMC4xOTQyNjMxMDAw",
        },
        {
          title: "HUB",
          path: "https://vhub.vanlanguni.edu.vn/",
        },
        {
          title: "E-job",
          path: "https://ejob.vlu.edu.vn/?_gl=1*p49jyh*_ga*MTAxMzc4MTk3OC4xNjk5MTE1Nzkx*_ga_JJNEHZH45Q*MTcxMTY1MTMxMC4yNi4xLjE3MTE2NTI0MDQuNjAuMC4xOTQyNjMxMDAw",
        },
      ],
    },
    {
      title: "Liên hệ",
      items: [
        {
          title: "Trường Đại học Văn Lang",
          path: "https://www.vlu.edu.vn/",
        },
        {
          title: "Cơ sở 1: 45 Nguyễn Khắc Nhu, P. Cô Giang, Q.1, Tp. HCM",
          path: "/",
        },
        {
          title: "Cơ sở 2: 233A Phan Văn Trị, P.11, Q. Bình Thạnh, Tp. HCM",
          path: "/",
        },
        {
          title: "Cơ sở 3: 80/68 Dương Quảng Hàm, P. 5, Q. Gò Vấp, Tp. HCM",
          path: "/",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center bg-[#2d334d] p-5">
      <div className=" flex items-center gap-4">
        <Image
          src="/images/logo/logo.png"
          alt="Van Lang University"
          width={200}
          height={50}
        />
        <div className="flex flex-wrap gap-22 lg:gap-10">
          <div>
            <h3 className="text-white">Email</h3>{" "}
            <p className="">info@vlu.edu.vn</p>
          </div>
          <div>
            <h3 className="text-white">Đào tạo</h3>
            <p className="">028.7109 9221</p>
          </div>
          <div>
            <h3 className="text-white">Tuyển sinh</h3>
            <p className="">028.7105 9999</p>
          </div>
          <div>
            <h3 className="text-white">Hỗ trợ sinh viên (Call Center)</h3>

            <p className="">028. 7106. 1111</p>
          </div>
          {/* <div className="grid h-fit flex-1 grid-cols-2 gap-4">
            <h3 className="text-white">Đào tạo</h3>

            <p className="">028.7109 9221</p>
          </div>
          <div className="grid h-fit flex-1 grid-cols-2 gap-4">
          
          </div> */}
        </div>
      </div>
      <div className="my-5 w-full border-t-[1px] border-[rgba(255,255,255,0.4)]"></div>
      <div className="flex flex-wrap gap-10">
        <div className="m-auto">
          <Image
            src="/images/logo/vanlanglogo.png"
            alt="Van Lang University"
            width={100}
            height={100}
          />
        </div>
        {info.map((item, index) => (
          <div key={index} className="space-y-5">
            <h3 className="text-white">{item.title}</h3>
            <ul className="space-y-5">
              {item.items.map((subItem, index) => (
                <li key={index}>
                  <a
                    href={subItem.path}
                    target="_blank"
                    className="hover:text-white"
                  >
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ width: "100%" }}>
        <iframe
          width="300"
          height="300"
          src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q=RMHX+FFC,%20Ph%C6%B0%E1%BB%9Dng%205,%20G%C3%B2%20V%E1%BA%A5p,%20H%E1%BB%93%20Ch%C3%AD%20Minh,%20Vietnam+(My%20Business%20Name)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps vehicle tracker</a>
        </iframe>
      </div>

      <div className="my-5 w-full border-t-[1px] border-[rgba(255,255,255,0.4)]"></div>
      <div className="flex w-full items-center justify-between ">
        <p>© 2024 Van Lang University. All rights reserved.</p>
        <div className="flex gap-10">
          <p>Điều khoản</p>
          <p>Chính sách Bảo mật</p>
          <p>Copyright</p>
        </div>
      </div>
    </div>
  );
};
