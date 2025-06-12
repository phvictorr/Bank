'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../../components/menu';
import { FaPix } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';
import { TbPigMoney } from 'react-icons/tb';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Alert } from '@heroui/react';
import RowSteps from '../../components/row-steps';
import { Input, Button } from '@heroui/react';
import ShinyText from '../../components/ShinyText';


const items = [
  { icon: <FaPix />, color: 'blue', label: 'Pix', link: '/pix' },
  { icon: <FiFileText />, color: 'purple', label: 'Boletos' },
  { icon: <TbPigMoney />, color: 'red', label: 'Sonhos' },
];

const title = "Nenhum boleto encontrado";
const description = "Suas contas estão em dia. Continue assim!";
const title_sonhos = "Sua caixinha dos Sonhos";
const description_sonhos = "Rendeu R$ 1.12 ontem";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState('');
  const [saldo, setSaldo] = useState('0');
  const [chavePix, setChavePix] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/login');
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const jwtUser = decodedToken.userID;
      setUser(jwtUser);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      fetch(`${backendUrl}/users/${jwtUser}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.saldo) {
            setSaldo(data.saldo);
          }
          if (data.chavePix) {
            setChavePix(data.chavePix);
            setCurrentStep(2);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [router]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/login');
  };

  const handleChavePixSubmit = async () => {
    const token = localStorage.getItem('jwtToken');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    if (chavePix !== '') {
      try {
        const response = await fetch(`${backendUrl}/users/chavePix`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ chavePix })
        });

        if (response.ok) {
          setCurrentStep(2);
          alert('Chave Pix cadastrada com sucesso!');
        } else {
          alert('Erro ao cadastrar Chave Pix.');
        }
      } catch (error) {
        console.error('Error during Chave Pix submission:', error);
      }
    }
  };

  const handleContinue = () => {
    setCurrentStep(1);
  };

  return (
    <main className="flex">
      <div className="w-1/4 h-screen bg-zinc-800 flex items-center justify-start">
        <Menu items={items} user={user} onLogout={handleLogout} className="flex flex-col items-center gap-12" />
      </div>
      <div className="size-14 grow">
        <div className="grid grid-flow-col grid-rows-3 gap-4 ml-5 px-5 py-5">
          <div className="row-span-3">
            <Card className="py-4 relative">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <button
                  onClick={toggleVisibility}
                  className="absolute top-2 right-1 p-1 rounded-full bg-zinc-800 hover:bg-red-500 focus:outline-none"
                  aria-label="Toggle visibility"
                >
                  {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
                <p className="text-tiny uppercase font-bold">{user}</p>
                <small className="text-default-500">Conta corrente</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2 flex flex-col items-start">
                <div className="text-3xl font-bold mb-2">
                  {isVisible ? `R$ ${saldo}` : "****"}
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-span-2">
            <div className="flex items-center justify-center w-full">
              <Alert color="success" description={description} title={title} />
            </div>
          </div>
          <div className="col-span-2 row-span-2">
            <div className="flex items-center justify-center w-full">
              <Alert color="secondary" description={description_sonhos} title={title_sonhos} />
            </div>
          </div>
        </div>
        <Card className="w-3/4 py-4 relative gap-4 ml-10 px-5 ">
          <RowSteps
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            color="primary"
            steps={[
              { title: "Conta Criada" },
              { title: "Chave Pix" },
              { title: "Depositar" },
              { title: "Meus Sonhos" }
            ]}
          />
          {currentStep === 0 && (
            <div className="flex flex-col items-center my-5">
              <p>Você já possui uma conta no Educa Bank. Agora, siga as próximas etapas para aproveitar os benefícios!</p>
              <Button onClick={handleContinue}><ShinyText text="Continuar" disabled={false} speed={3} className="custom-class" /></Button>
            </div>
          )}
          {currentStep === 1 && (
            <div className="flex flex-col items-center">
              <Input
                value={chavePix}
                placeholder="Digite sua Chave Pix"
                onChange={(e) => setChavePix(e.target.value)}
              />
              <Button onClick={handleChavePixSubmit}><ShinyText text="Salvar ChavePix" disabled={false} speed={3} className="custom-class" /></Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}