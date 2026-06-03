import rocket from "@/assets/images/rocket.png";
import LoginSignUpForm from "@/components/Login/LoginSignUpForm";
import Container from "@/components/Shared/Container";
import { sedgwick, roboto } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Login = async () => {
  const session = await auth();
  if (session?.user?.email) redirect("/");

  return (
    <div className="min-h-[90vh] bg-black text-white relative mt-[80px]">
      <div className="container mx-auto px-4 pt-0 pb-2 relative z-10">
        <div className=" flex items-center">
          <Link href="/">
            <Button
              variant="ghost"
              className={`${sedgwick.className} text-white hover:text-red-400 cursor-pointer`}
            >
              <ArrowLeft className=" h-4 w-4" />
              HOME
            </Button>
          </Link>
        </div>
      </div>
      <Image
        src={rocket}
        alt=""
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[0]"
      />
      <Container>
        <div className={` flex flex-col md:flex-row justify-between`}>
          <div className="flex flex-col h-[70vh] justify-center flex-1 relative z-[10] gap-5">
            <h1
              className={`${sedgwick.className} text-3xl md:text-4xl lg:text-7xl text-red-700`}
            >
              Welcome to our <br /> community!
            </h1>
            <p className={`${sedgwick.className}`}>
              Start your new journey with us and <br /> join our community
            </p>
          </div>
          <div className=" flex-1">
            {/* Login Form */}
            <LoginSignUpForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
