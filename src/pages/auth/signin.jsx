import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Header } from "src/components/Header";
import { Button, LoadingOverlay } from "@mantine/core";
import { BsGithub, BsGoogle } from "react-icons/bs";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const SignIn = ({ providers }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider) => {
    setIsLoading(true);
    await signIn(provider.id, { callbackUrl: "/" });
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col mx-auto  mt-24 w-96 h-[300px] rounded-md border shadow-md item-center">
        <h1 className="flex justify-center my-10  text-2xl font-bold">
          Sign In
        </h1>
        <LoadingOverlay visible={isLoading} />
        <ul className="flex flex-col gap-3 justify-center items-center">
          {Object.values(providers).map((provider) => (
            <li key={provider.name}>
              <Button
                className="w-80 bg-gray-500"
                color="gray"
                disabled={isLoading}
                onClick={() => handleSignIn(provider)}
              >
                <p className="mr-4 text-xl">
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
