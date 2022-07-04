import React from "react";
import { useState, useRef } from "react";

interface UserProps {
  login: string;
  password: string;
}
export const UserLogin: React.FC<UserProps> = () => {
  // function component <props>

  const [login, setLogin] = useState<string>("test");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
};
