import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="max-w-sm mx-auto">
      <SignUp afterSignUpUrl={"/"} />
    </div>
  );
}
