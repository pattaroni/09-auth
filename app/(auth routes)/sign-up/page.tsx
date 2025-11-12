"use client";

import { AuthBody, register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";

function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const registerMutation = useMutation({
    mutationFn: (body: AuthBody) => register(body),
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
          "Oops... some error"
      );
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const regBody = Object.fromEntries(formdata) as unknown as AuthBody;

    if (regBody.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    } else if (!validator.isEmail(regBody.email)) {
      setError("Invalid email address");
      return;
    }

    setError("");
    registerMutation.mutate(regBody);
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleRegister}>
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            disabled={registerMutation.isPending}
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
            disabled={registerMutation.isPending}
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignUpPage;
