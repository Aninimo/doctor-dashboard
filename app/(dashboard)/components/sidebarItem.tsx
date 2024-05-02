'use client';

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ href, icon: Icon, label }) => {
    const router = useRouter()
  
    const onClick = () => {
      router.push(href)
    }
  
    return (
      <button onClick={onClick}>
        <div className='flex items-center gap-x-2 py-4 pr-12 transition-all duration-300 rounded-3xl cursor-pointer hover:bg-white hover:text-blue-500 hover:shadow-md'>
          <div className='flex gap-2 ml-4'>
            <Icon size={22} />
            {label}
          </div>
        </div>
      </button>
    )
  }

  export { SidebarItem };