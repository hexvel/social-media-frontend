import { ToasterProps } from "react-hot-toast";

export const TOASTER_CONSTANT: ToasterProps = {
  position: "top-center",
  reverseOrder: false,
  toastOptions: {
    style: {
      backgroundColor: "#1a1a1a",
      color: "#fff",
    },
    duration: 1500,
  },
};
