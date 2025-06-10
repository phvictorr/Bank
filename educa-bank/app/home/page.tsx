import Menu from "../../components/menu";
import { FaPix } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { TbPigMoney } from "react-icons/tb";


const items = [
  { icon: <FaPix />, color: 'blue', label: 'Pix' },
  { icon: <FiFileText />, color: 'purple', label: 'Boletos' },
  { icon: <TbPigMoney />, color: 'red', label: 'Sonhos' },
];

export default function HomePage() {
    return (
        <main className="flex">
            <div className="w-1/4 h-screen bg-gray-950 flex items-center justify-start">
                <Menu items={items} className="flex flex-col items-center gap-12"/>
            </div>
            <div className="size-14 grow">

            </div>
        </main>
    );
}