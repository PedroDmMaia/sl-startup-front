import AuthForm from '@/components/auth-form'
import Image from 'next/image'
import React from 'react'
import { CiUser } from 'react-icons/ci'

export default async function page() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center bg-bg-sign-in-1">
        <div className="">
          <div className="flex items-center justify-center">
            <Image
              src="/logo-1.png"
              width={1000}
              height={1000}
              quality={100}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-bg-sign-in-2">
        <div className="flex flex-col items-center w-full max-w-md">
          <h2 className="text-white text-5xl leading-tight">Bem Vindo</h2>

          <div className="flex flex-col items-center gap-4 w-full">
            <CiUser className="text-white" size={90} />

            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  )
}
