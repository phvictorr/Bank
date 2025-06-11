"use client";

import React from "react";
import {Button, Input, Checkbox, Link} from "@heroui/react";
import {Icon} from "@iconify/react";
import ShinyText from '@/components/ShinyText';

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <ShinyText text="educa bank" disabled={false} speed={3} className='text-6xl font-sans' />
          <p className="text-small text-default-500">Crie sua conta gratuitamente.</p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <Input
              isRequired
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="Usuário"
              name="username"
              placeholder="Escreva seu nome de usuário"
              type="text"
              variant="bordered"
            />
            <Input
              isRequired
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="E-mail"
              name="email"
              placeholder="Escreva seu melhor e-mail"
              type="email"
              variant="bordered"
            />
            <Input
              isRequired
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Senha"
              name="password"
              placeholder="Escreva sua senha mais segura"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <Input
              isRequired
              classNames={{
                inputWrapper: "rounded-t-none",
              }}
              endContent={
                <button type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Confirmar senha"
              name="confirmPassword"
              placeholder="Escreva novamente pra validar"
              type={isConfirmVisible ? "text" : "password"}
              variant="bordered"
            />
          </div>
          <Checkbox color="default" isRequired className="py-4" size="sm">
           Eu aceito os &nbsp;
            <Link className="relative z-[1]" href="#" size="sm">
              Termos
            </Link>
            &nbsp; e a &nbsp;
            <Link className="relative z-[1]" href="#" size="sm">
              Política de Privacidade.
            </Link>
          </Checkbox>
          <Button color="default" type="submit">
            <ShinyText text="Confirmar" disabled={false} speed={3} className='custom-class' />
          </Button>
        </form>
      </div>
    </div>
  );
}