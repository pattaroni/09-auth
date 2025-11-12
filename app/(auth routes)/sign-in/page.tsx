"use client";

import { AuthBody, login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";

function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: (body: AuthBody) => login(body),
    onSuccess: (user) => {
      setError("");
      setUser(user);
      router.push("/profile");
    },
    onError: (err) => {
      const apiErr = err as ApiError;
      setError(
        apiErr.response?.data?.response?.message ||
          apiErr.response?.data?.error ||
          apiErr.message ||
          "Invalid email or password"
      );
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const logBody = Object.fromEntries(formdata) as unknown as AuthBody;

    if (logBody.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    } else if (!validator.isEmail(logBody.email)) {
      setError("Invalid email address");
      return;
    }

    setError("");
    loginMutation.mutate(logBody);
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignInPage;
