import { Sedgwick_Ave_Display, Roboto } from "next/font/google";

export const sedgwick = Sedgwick_Ave_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sedgwick",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
  variable: "--font-roboto",
});
