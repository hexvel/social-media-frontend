"use client";

import {
  CustomDialog as Dialog,
  CustomDialogContent as DialogContent,
} from "@/components/ui/custom-dialog";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IUser } from "@/types/user.type";
import { Calendar, User2 } from "lucide-react";

interface UserFullInfoProps {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

export const UserFullInfo = ({ user, isOpen, onClose }: UserFullInfoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200 bg-primary-theme border border-secondary-theme'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>
            About {user.firstName} {user.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          <div className='flex items-center gap-4'>
            <div>
              <h2 className='text-xl font-medium'>
                {user.firstName} {user.lastName}
              </h2>
              {user.bio ? (
                <p className='text-muted-foreground text-sm mt-1'>{user.bio}</p>
              ) : (
                <p className='text-muted-foreground text-sm mt-1'>No bio</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<User2 className='h-5 w-5' />}
              label='Display name'
              value={`@${user.username}` || "Not specified"}
            />
            <InfoItem
              icon={<Calendar className='h-5 w-5' />}
              label='Registration date'
              value={new Date(user.createdAt).toLocaleDateString("ru-RU")}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className='flex items-center gap-3 p-3 rounded-lg bg-black/10'>
      {icon}
      <div>
        <p className='text-sm text-muted-foreground'>{label}</p>
        <p className='font-medium'>{value}</p>
      </div>
    </div>
  );
};
