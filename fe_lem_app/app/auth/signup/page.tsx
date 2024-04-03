import Signup from "@/components/ComponentsLandingPage/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
