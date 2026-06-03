"use server";

import { signIn } from "@/auth";
import { LoginCredentials } from "@/interfaces/signup.interface";
import { CredentialsSignin } from "next-auth";

export const login = async (loginCredentials: LoginCredentials) => {
  try {
    const result = await signIn("credentials", {
      email : loginCredentials.email,
      password : loginCredentials.password,
      redirect: false,
    });
    return result;
  } catch (error) {
    const err = error as CredentialsSignin;
    return { error: err.message || err.cause };
  }
};