import icons from "./icons"
const {BsFillPostcardFill, RxAvatar, FaPenSquare, HiOutlinePencilAlt, HiOutlineNewspaper, IoIosSettings, RiFilePaper2Line, BiMessageRounded} = icons
export const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <FaPenSquare/>
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <BsFillPostcardFill/>
    },
    {
        id: 3,
        text: 'Thông tin tài khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <RxAvatar/>
    },
]

export const menuManageSystem = [
    {
        id: 1,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <HiOutlineNewspaper/>
    },
    {
        id: 2,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <HiOutlinePencilAlt/>
    },
    {
        id: 3,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <IoIosSettings/>
    },
    {
        id: 4,
        text: 'Bảng giá dịch vụ',
        path: '/he-thong/bang-gia',
        icon: <RiFilePaper2Line/>
    },
    {
        id: 5,
        text: 'Liên hệ',
        path: '/lien-he',
        icon: <BiMessageRounded/>
    },
]