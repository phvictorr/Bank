'use client';

import Menu from '../../components/menu';
import { CiBank } from "react-icons/ci";
import { FiFileText } from 'react-icons/fi';
import { TbPigMoney } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { withAuth } from '../../components/withAuth';

const Pix: React.FC<{ user: string }> = ({ user }) => {
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/login');
  };

  const items = [
    { icon: <CiBank />, color: 'blue', label: 'Conta', link: '/home' },
    { icon: <FiFileText />, color: 'purple', label: 'Boletos' },
    { icon: <TbPigMoney />, color: 'red', label: 'Sonhos' },
  ];

  return (
    <main className="flex">
      <div className="w-1/4 h-screen bg-zinc-800 flex items-center justify-start">
        <Menu items={items} user={user} onLogout={handleLogout} className="flex flex-col items-center gap-12" />
      </div>
    </main>
  );
}

export default withAuth(Pix);