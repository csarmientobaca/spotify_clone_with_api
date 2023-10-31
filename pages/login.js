import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button";
const Login = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Button className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg"
                onClick={() =>
                    signIn('spotify', { callbackUrl: "/" })}>Click to Login with spotify
            </Button>
        </div>
    );
}

export default Login;