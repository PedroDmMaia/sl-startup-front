'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import { EmployeeProvider } from '../context/employee-context'

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathName = usePathname()

  const isActive = (path: string) => pathName === path

  return (
    <EmployeeProvider>
      <div className="grid grid-cols-12">
        <aside className="grid col-span-1 max-w-32 grid-rows-10 gap-4 bg-bg-sign-in-2 min-h-full">
          <div className="flex items-center justify-center max-h-[150px] row-span-2">
            <Image
              src="/logo-2.png"
              width={80}
              height={80}
              quality={100}
              alt=""
            />
          </div>

          <ul className="flex flex-col pb-20 justify-around min-h-full min-w-full row-span-8">
            <li
              className={`h-24 flex justify-center items-center w-full py-3 ${
                isActive('/dashboard') ? 'bg-zinc-600' : 'hover:bg-zinc-600'
              }`}
            >
              <Link
                className="flex flex-col items-center text-center gap-2"
                href="/dashboard"
              >
                <BsGraphUpArrow className="text-white" size={30} />
                <span className="text-white leading-3 text-sm">
                  Painel <br /> de controle
                </span>
              </Link>
            </li>

            <li
              className={`h-24 flex justify-center items-center w-full py-3 ${
                isActive('/dashboard/employee')
                  ? 'bg-zinc-600'
                  : 'hover:bg-zinc-600'
              }`}
            >
              <Link
                className="flex flex-col items-center text-center gap-2"
                href="/dashboard/employee"
              >
                <FaUsers className="text-white" size={30} />
                <span className="text-white leading-3 text-sm">
                  Funcionarios
                </span>
              </Link>
            </li>

            <li
              className={`h-24 flex justify-center items-center w-full py-3 ${
                isActive('') ? 'bg-zinc-600' : 'hover:bg-zinc-600'
              }`}
            >
              <Link
                className="flex flex-col items-center text-center gap-2"
                href=""
              >
                <FaGear className="text-white" size={30} />
                <span className="text-white leading-3 text-sm">
                  Folha de pagamento
                </span>
              </Link>
            </li>
          </ul>
        </aside>

        <div className="grid col-span-11 py-16 min-h-screen justify-center w-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </EmployeeProvider>
  )
}
