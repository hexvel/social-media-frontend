import { MOCK_NOTIFICATIONS } from "@/constants/notifications.constant";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface NotificationsDropdownProps {
  isOpen: boolean;
}

export function NotificationsDropdown({ isOpen }: NotificationsDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className='absolute right-0 mt-2 w-96 bg-primary-theme rounded-md shadow-lg p-4 z-50'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-white font-medium'>Notifications</h3>
        <span className='text-xs text-[#6f7376] cursor-pointer'>
          Mark all as read
        </span>
      </div>
      <div className='space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar'>
        {MOCK_NOTIFICATIONS.length === 0 ? (
          <div className='text-center text-sm text-[#6f7376]'>
            No notifications yet
          </div>
        ) : (
          MOCK_NOTIFICATIONS.map(notification => (
            <div
              key={notification.id}
              className={`p-3 rounded-md ${
                notification.isRead
                  ? "bg-primary-theme/60"
                  : "bg-secondary-theme/10"
              } hover:bg-secondary-theme/20 transition-colors`}
            >
              <div className='flex items-start gap-x-3'>
                <Link href={`/user/${notification.userId}`}>
                  <Image
                    src={notification.userAvatar || "/default-avatar.png"}
                    width={40}
                    height={40}
                    alt='User avatar'
                    className='rounded-full'
                  />
                </Link>
                <div className='flex-1'>
                  <h4 className='text-white font-medium text-sm'>
                    {notification.title}
                  </h4>
                  <p className='text-[#6f7376] text-sm mt-1'>
                    {notification.message}
                  </p>
                  <div className='flex items-center gap-x-2 mt-2'>
                    <span className='text-[#6f7376] text-xs'>
                      {formatDistance(notification.date, new Date(), {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </span>
                    {!notification.isRead && (
                      <div className='h-2 w-2 bg-blue-500 rounded-full' />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
