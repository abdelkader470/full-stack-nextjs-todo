import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="max-w-sm mx-auto">
      <SignIn afterSignInUrl={"/"} />
    </div>
  );
}
