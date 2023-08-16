import Image from "next/image";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import UserChooser from "@/components/views/UserChooser";
import ChatAppBar from "@/components/ChatAppBar";

export default function Home() {
  return (
    <div>
      <ChatAppBar />
      <UserChooser />
    </div>
  );
}
