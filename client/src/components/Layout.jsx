import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* Header/Navbar bisa ditaruh di sini */}
      <Outlet /> {/* Ini akan merender child routes */}
    </div>
  )
}