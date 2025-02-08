import { Skeleton } from "../ui/skeleton";

export default function PostsLoadingSkeleton() {
  return (
    <div className='space-y-5'>
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
    </div>
  );
}

function PostLoadingSkeleton() {
  return (
    <div className='w-full space-y-3 flex flex-col p-4 bg-primary-theme rounded-md'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-x-3'>
          <Skeleton className='size-[60px] rounded-full' />
          <div className='flex flex-col'>
            <div className='flex items-center gap-x-2'>
              <Skeleton className='h-5 w-32 rounded' />
              <Skeleton className='size-5 rounded-full' />
            </div>
            <Skeleton className='h-4 w-24 rounded mt-1' />
          </div>
        </div>
        <Skeleton className='size-8 rounded-full' />
      </div>

      <Skeleton className='h-[300px] w-full rounded-md' />
      <Skeleton className='h-16 rounded' />

      <div className='mt-4 w-full flex items-center justify-between'>
        <div className='flex items-center gap-x-6'>
          <div className='flex items-center gap-x-2'>
            <Skeleton className='size-6 rounded' />
            <Skeleton className='h-4 w-8 rounded' />
          </div>
          <div className='flex items-center gap-x-2'>
            <Skeleton className='size-6 rounded' />
            <Skeleton className='h-4 w-8 rounded' />
          </div>
        </div>
        <Skeleton className='size-6 rounded' />
      </div>
    </div>
  );
}
