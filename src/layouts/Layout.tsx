import Header from "../components/Header"
import Sidebar from "../components/sidebar"

type Props = {
  children: React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <>
      <div className="h-screen flex items-center">
        <div className="h-4/5 w-4/5 bg-[#313338] text-white flex flex-col mx-auto rounded-xl overflow-hidden">
          <Header />
          <div className="flex flex-1 min-h-0">
            <Sidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}