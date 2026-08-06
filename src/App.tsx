import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import GachaOpening from "./pages/GachaOpening";
import Result from "./pages/Result";
import Admin from "./pages/Admin";
import CardEdit from "./pages/admin/CardEdit";
import CardAdd from "./pages/admin/CardAdd";
import UserCardList from "./pages/UserCardList";
import Loading from "./pages/Loading";
import useDiscord from "./hooks/useDiscord";

console.log("App.tsx Start");

export default function App() {
  //* デバック用
  // const [debug, setDebug] = useState<string[]>([]);

  const {user, loading, progress, msg} = useDiscord();

  if (loading) {
    return (
      <Loading progress={progress} msg={msg}/>
    )
  }
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user ?? undefined}/>} />
          <Route path="/loading" element={<Loading progress={progress} msg={msg}/>} />
          <Route path="/gacha" element={<Gacha user={user ?? undefined}/>} />
          <Route path="/gacha/opening" element={<GachaOpening />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin" element={<Admin user={user ?? undefined} />} />
          <Route path="/admin/cards/:id" element={<CardEdit />} />
          <Route path="/admin/cards/add" element={<CardAdd />} />
          <Route path="/cardlist" element={<UserCardList user={user ?? undefined}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}