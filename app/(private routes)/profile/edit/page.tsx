"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EditUserBody, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/api";

function EditProfilePage() {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.username || "");

  const UpdateMeMutation = useMutation({
    mutationFn: (body: EditUserBody) => updateMe(body),
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email) {
      setError("No user email found");
      return;
    } else if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    } else if (username.trim().length > 20) {
      setError("Username must be no longer than 20 characters");
      return;
    }

    setError("");
    UpdateMeMutation.mutate({ email: user.email, username });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUsername(value);

    if (value.trim().length < 3) {
      setError("Username must be at least 3 characters long");
    } else if (username.trim().length > 20) {
      setError("Username must be no longer than 20 characters");
      return;
    } else {
      setError("");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={`${user?.avatar}`}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleUpdate}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {username}</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
            {error && <p className={css.error}>{error}</p>}
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={!!error}>
              {UpdateMeMutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfilePage;
