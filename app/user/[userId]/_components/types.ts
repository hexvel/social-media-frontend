export interface UserProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  onInfoClick: () => void;
}
