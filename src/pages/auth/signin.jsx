import React, { useEffect, useState } from "react";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { Header } from "src/components/Header";
import { Button, LoadingOverlay } from "@mantine/core";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const SignIn = ({ providers }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (provider) => {
    setIsLoading(true);
    await signIn(provider.id, { callbackUrl: "/" });
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col item-center  h-[300px] mx-auto mt-24 w-96 border rounded-md shadow-md">
        <h1 className="font-bold text-2xl flex  justify-center my-10">
          Sign In
        </h1>
        <LoadingOverlay visible={isLoading} />
        <ul className="flex flex-col items-center justify-center gap-3">
          {Object.values(providers).map((provider) => (
            <li key={provider.name}>
              <Button
                className="bg-gray-500 w-80"
                color="gray"
                disabled={isLoading}
                onClick={() => handleSignIn(provider)}
              >
                <p className="text-xl mr-4">
                  {provider.name === "Google" && <BsGoogle />}
                  {provider.name === "GitHub" && <BsGithub />}
                </p>
                <p className="">Sign in with {provider.name}</p>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
