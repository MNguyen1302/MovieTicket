import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie"
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv"
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  }
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite"
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews"
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update"
  }
];

const cinemas = [
  {
    name: "All",
    logo: "https://static.vecteezy.com/system/resources/previews/002/372/378/non_2x/cute-star-character-mascot-flat-cartoon-emoticon-design-illustration-vector.jpg",
    cluster: "all",
  },
  {
    name: "CGV",
    logo: "https://gigamall.com.vn/data/2019/05/06/11365490_logo-cgv-500x500.jpg",
    cluster: "cgv",
  },
  {
    name: "BHD Star",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/Logo_BHD_Star_Cineplex.png",
    cluster: "bhd",
    
  },
  {
    name: "Lotte Cinema",
    logo: "https://tenpack.com.vn/wp-content/uploads/2016/02/logo-lotte-cinema.jpg",
    cluster: "lotte",

  },
  {
    name: "Galaxy Cinema",
    logo: "https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/c366498992d989524d4a69c495a6189e.png",
    cluster: "galaxy",
    
  },
  {
    name: "DCINE",
    logo: "https://img.mservice.io/momo_app_v2/new_version/img/THAO.MAI/DcineLogo.png",
    cluster: "dcine",

  }
]

const seatCaptions = [
  {
    content: "regular",
    color: "#722ed1"
  },
  {
    content: "premium",
    color: "#f5222d"
  },
  {
    content: "sold",
    color: "#404040"
  },
  {
    content: "selected",
    color: "#d82d8b"
  },
]

const menuConfigs = { main, user, cinemas, seatCaptions };

export default menuConfigs;