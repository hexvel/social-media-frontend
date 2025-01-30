import { useRegisterUserMutation } from '@/store/api/user.api'
import { useAppDispatch } from '@/store/hooks'

export default function AuthPage() {
  return (
    <div className="text-center">
      <h1>Auth Page</h1>
      <p>Welcome to the Auth Page</p>
    </div>
  );
}

// useRegisterUserMutation().then((response) => {
//   useAppDispatch()
// })