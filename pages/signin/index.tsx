import { Provider } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { GitHub } from "react-feather";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useUser } from "../../utils/useUser";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: "",
    content: "",
  });
  const router = useRouter();

  const { user, signIn } = useUser();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    const { error } = await signIn({ email, password });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }

    if (!password) {
      setMessage({
        type: "note",
        content: "Check your email for the magic link",
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: "error", content: error.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className=" mt-24 flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex justify-center pb-12 ">
            <h1 className="text-4xl">Logo</h1>
          </div>
          <div className="flex flex-col space-y-4">
            {message.content && (
              <div
                className={`${
                  message.type === "error" ? "text-pink-500" : "text-green-500"
                } border ${
                  message.type === "error"
                    ? "border-pink-500"
                    : "border-green-500"
                } p-3`}
              >
                {message.content}
              </div>
            )}

            {!showPasswordInput && (
              <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!email.length}
                >
                  Send magic link
                </Button>
              </form>
            )}

            {showPasswordInput && (
              <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  required
                />
                <Button
                  className="mt-1"
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!password.length || !email.length}
                >
                  Sign in
                </Button>
              </form>
            )}

            <span className="pt-1 text-center text-sm">
              <a
                href="#"
                className="text-black-200 text-accent-9 hover:underline cursor-pointer"
                onClick={() => {
                  if (showPasswordInput) setPassword("");
                  setShowPasswordInput(!showPasswordInput);
                  setMessage({});
                }}
              >
                {`Or sign in with ${
                  showPasswordInput ? "magic link" : "password"
                }.`}
              </a>
            </span>

            <span className="pt-1 text-center text-sm">
              <span className="text-black-200">Don't have an account?</span>
              {` `}
              <Link href="/signup">
                <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                  Sign up.
                </a>
              </Link>
            </span>
          </div>
          {/* TODO: add external providers */}
          {/* <div className="flex items-center my-6">
            <div
              className="border-t border-gray-600 flex-grow mr-3"
              aria-hidden="true"
            ></div>
            <div className="text-black-400">Or</div>
            <div
              className="border-t border-gray-600 flex-grow ml-3"
              aria-hidden="true"
            ></div>
          </div>
          
          <Button
            variant="slim"
            type="submit"
            disabled={loading}
            onClick={() => handleOAuthSignIn("github")}
            loading={loading}
          >
            <GitHub />
            <p className="text-sm ml-2">Continue with GitHub</p>
          </Button> */}
        </div>
      </div>
    );

  return (
    <div className="m-6 mt-48">
      <p>loading....</p>
    </div>
  );
};

export default SignIn;
