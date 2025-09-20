import type { Route } from "./+types/home";
import  Tela2  from "./Tela2";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Tela2 />; 
}