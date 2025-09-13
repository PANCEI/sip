import { useState } from 'react';
import { Menu, X, Home, BarChart, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const NavLink = ({ icon, text }) => (
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-zinc-700 hover:text-white"
    >
      {icon}
      <span>{text}</span>
    </a>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-zinc-800 text-zinc-300 transform transition-transform duration-300 md:relative md:translate-x-0 z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-700">
        <h1 className="text-xl font-bold text-white">Dasbor</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-zinc-400 hover:text-white md:hidden"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="p-4">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink icon={<Home size={20} />} text="Ringkasan" />
          </li>
          <li>
            <NavLink icon={<BarChart size={20} />} text="Analisis" />
          </li>
          <li>
            <NavLink icon={<Settings size={20} />} text="Pengaturan" />
          </li>
          <li>
            <NavLink icon={<LogOut size={20} />} text="Keluar" />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const Header = ({ setSidebarOpen }) => (
  <header className="flex items-center justify-between p-4 bg-white shadow-md z-10">
    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-zinc-600 hover:text-black">
      <Menu size={24} />
    </button>
    <h2 className="text-2xl font-semibold text-zinc-800">Ringkasan Dasbor</h2>
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center text-zinc-600">
        <span className="font-bold">JS</span>
      </div>
    </div>
  </header>
);

const MainContent = () => (
  <main className="flex-1 p-6 overflow-y-auto">
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold text-zinc-800 mb-4">Konten Utama</h3>
      <p className="text-zinc-600">
        Selamat datang di dasbor Anda. Ini adalah area konten utama tempat Anda dapat menambahkan widget, bagan, atau informasi lainnya.
        Anda dapat mengubah konten di dalam komponen ini.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-zinc-100 p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg text-zinc-800">Widget 1</h4>
        <p className="text-zinc-600">Contoh widget. Ganti dengan konten Anda.</p>
      </div>
      <div className="bg-zinc-100 p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg text-zinc-800">Widget 2</h4>
        <p className="text-zinc-600">Contoh widget. Ganti dengan konten Anda.</p>
      </div>
      <div className="bg-zinc-100 p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg text-zinc-800">Widget 3</h4>
        <p className="text-zinc-600">Contoh widget. Ganti dengan konten Anda.</p>
      </div>
    </div>
  </main>
);

export default function App() {
  // State untuk mengontrol visibilitas sidebar pada perangkat seluler
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-200 font-sans">
      {/* Sidebar yang akan muncul di perangkat besar dan dapat di-toggle di seluler */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Container utama untuk header dan konten */}
      <div className="flex flex-col flex-1">
        {/* Header atas dengan tombol untuk membuka sidebar di perangkat seluler */}
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Area konten utama yang dapat di-scroll */}
        <MainContent />
      </div>

      {/* Overlay untuk sidebar di perangkat seluler */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
