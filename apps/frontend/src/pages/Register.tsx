import { useCreateUser } from "@/api/user/useCreateUser";
import { Loader } from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/useToast";
import { AuthenticationService } from "@/services/AuthenticationService";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const createUser = useCreateUser();

  useEffect(() => {
    if (isLogged) navigate("/me");
  }, [isLogged, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    AuthenticationService.register({ email, password })
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
          setIsLoading(false);
          throw new Error(res.error.message);
        }
        return res;
      })
      .then((res) => {
        console.log({ res });
        if (res.data.user?.id && res.data.user?.email)
          return createUser.mutateAsync({
            uid: res.data.user.id,
            email: res.data.user.email,
          });
        throw new Error("Missing user data");
      })
      .then(() => {
        console.log("User created successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error({ error });
        toast({
          title: error.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {createUser.isPending && <Loader />}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
