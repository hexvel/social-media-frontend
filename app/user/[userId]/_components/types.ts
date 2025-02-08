export interface UserProps {
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  onInfoClick: () => void;
}
