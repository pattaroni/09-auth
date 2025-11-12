import { cookies } from "next/headers";
import { ENDPOINTS, nextServer } from "./api";
import { User } from "@/types/user";

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get(ENDPOINTS.checkSession(), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(ENDPOINTS.getMe(), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
