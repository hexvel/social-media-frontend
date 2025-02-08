import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface UserActionsProps {
  isMobile?: boolean;
}

export const UserActions = ({ isMobile = false }: UserActionsProps) => {
  if (isMobile) {
    return (
      <div className='p-2 mt-4'>
        <button className='w-full py-3 bg-zinc-800 text-white rounded-lg'>
          Сообщение
        </button>
      </div>
    );
  }

  return (
    <div className='flex gap-2'>
      <Button variant='secondary' className='cursor-pointer text-sm'>
        Сообщение
      </Button>
      <Button variant='secondary' size='icon' className='cursor-pointer'>
        <MoreHorizontal className='h-4 w-4' />
      </Button>
    </div>
  );
};
