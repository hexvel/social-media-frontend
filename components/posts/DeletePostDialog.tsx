import { useDeletePostMutation } from "@/services/post.service";
import { IPost } from "@/types/post.type";
import toast from "react-hot-toast";
import LoadingButton from "../animations/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeletePostDialogProps {
  post: IPost;
  open: boolean;
  onClose: () => void;
}

const DeletePostDialog = ({ post, open, onClose }: DeletePostDialogProps) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const onOpenChange = (open: boolean) => {
    if (!open || isLoading) {
      onClose();
    }
  };

  const handleDelete = async () => {
    await deletePost({ id: post.id });
    onClose();
    toast.success("Post deleted successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-primary-foreground border-none'>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant={"destructive"}
            onClick={handleDelete}
            isLoading={isLoading}
            className='bg-primary-theme cursor-pointer'
          >
            Delete
          </LoadingButton>
          <LoadingButton
            variant={"outline"}
            onClick={onClose}
            isLoading={isLoading}
            className='bg-primary-theme cursor-pointer'
          >
            Cancel
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
