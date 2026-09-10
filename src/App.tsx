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
import TenGachaCard from "./components/TenGacha";
import LoginBonus from "./pages/LoginBonus";
import Data from "./pages/data/Data";
import { TestSmokeCanvas } from "./components/test/TestSmoke";
import { BgmProvider } from "./pages/contexts/BgmContext";

console.log("App.tsx Start");

export default function App() {
  //* デバック用
  // const [debug, setDebug] = useState<string[]>([]);

  const { user, loading, progress, msg } = useDiscord();

  if (loading) {
    return (
      <Loading progress={progress} msg={msg} />
    )
  }

  if (!user) {
    return <Home></Home>
  }

  return (
    <>
      <BgmProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={import.meta.env.DEV ? <Admin user={user ?? undefined} /> : <LoginBonus user={user ?? undefined} />} />
            <Route path="/home" element={<Home user={user ?? undefined} />} />
            <Route path="/loading" element={<Loading progress={progress} msg={msg} />} />
            <Route path="/gacha" element={<Gacha user={user ?? undefined} />} />
            <Route path="/gacha/opening" element={<GachaOpening />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admin" element={<Admin user={user ?? undefined} />} />
            <Route path="/admin/cards/:id" element={<CardEdit />} />
            <Route path="/admin/cards/add" element={<CardAdd />} />
            <Route path="/cardlist" element={<UserCardList user={user ?? undefined} />} />
            <Route path="/test1" element={<TenGachaCard />} />
            <Route path="/test2" element={<TestSmokeCanvas />} />
            <Route path="/data" element={<Data user={user ?? undefined} />} />
          </Routes>
        </BrowserRouter>
      </BgmProvider>
    </>
  )
}