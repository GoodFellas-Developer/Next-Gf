"use client";

type Props = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type }: Props) {
  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50 transition-all duration-300 ease-in-out ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}
