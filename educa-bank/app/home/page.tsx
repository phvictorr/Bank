'use client';

import React, { useState } from "react";
import Menu from "../../components/menu";
import { FaPix } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { TbPigMoney } from "react-icons/tb";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Ícones de visibilidade
import {Alert} from "@heroui/react";

const items = [
  { icon: <FaPix />, color: 'blue', label: 'Pix' },
  { icon: <FiFileText />, color: 'purple', label: 'Boletos' },
  { icon: <TbPigMoney />, color: 'red', label: 'Sonhos' },
];

const title = "Nenhum boleto encontrado";
  const description = "Suas contas estão em dia. Continue assim!";

const title_sonhos = "Sua caixinha dos Sonhos";
  const description_sonhos = "Rendeu R$ 1.12 ontem"

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(true); // Estado para mostrar/ocultar o saldo

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <main className="flex">
            <div className="w-1/4 h-screen bg-zinc-800 flex items-center justify-start">
                <Menu items={items} className="flex flex-col items-center gap-12"/>
            </div>
            <div className="size-14 grow">
                <div className="grid grid-flow-col grid-rows-3 gap-4 ml-5 px-5 py-5">
                    <div className="row-span-3 ...">
                        <Card className="py-4 relative">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <button
                                    onClick={toggleVisibility}
                                    className="absolute top-2 right-1 p-1 rounded-full bg-zinc-800 hover:bg-red-500 focus:outline-none"
                                    aria-label="Toggle visibility"
                                >
                                    {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
                                </button>
                                <p className="text-tiny uppercase font-bold">Conta corrente</p>
                                <small className="text-default-500">Cesta Free</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2 flex flex-col items-start">
                                <div className="text-3xl font-bold mb-2">
                                    {isVisible ? "R$ 120,59" : "****"} {/* Exibe o saldo ou oculta */}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-2 ...">
                        <div className="flex items-center justify-center w-full">
                            <Alert color="success" description={description} title={title} />
                        </div>
                    </div>
                    <div className="col-span-2 row-span-2 ...">
                        <div className="flex items-center justify-center w-full">
                            <Alert color="secondary" description={description_sonhos} title={title_sonhos} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}