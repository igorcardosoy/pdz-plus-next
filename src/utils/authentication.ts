"use client"

import useSWR from "swr";
import { PDZ_URL } from "./requests";
import { user, pdzUser } from "@/entities/Users";
import { redirect, useRouter } from "next/navigation";

export type swrPDZUserRes = {
  data: user,
  error: any,
  isLoading: boolean
}



const fetcherWithToken = async (url: string) => {
  let token = window.localStorage.getItem("token");

  const options = {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    },
  };

  const response = await fetch(url, options);
  return await response.json();
};

async function authenticate(pdzUser: pdzUser): Promise<boolean> {

  const options = {
    method: 'POST',
    body: JSON.stringify({ "email": pdzUser.email, "password": pdzUser.password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }

  const data = await fetch(PDZ_URL + '/login', options)
  const result = await data.json();

  if (result.accessToken && result.user.id) {
    window.localStorage.setItem("token", result.accessToken)
    window.localStorage.setItem("userId", result.user.id)

    return true;
  }

  return false;
}



export function useAuthenticated(): boolean {
  const data = useSWR(PDZ_URL + '/660/users/', fetcherWithToken);

  if (!data.isLoading && !data.error) {
    const result = data.data

    if (result != 'jwt malformed') {
      return true
    }
  }

  return false
}

export async function isAuthenticated(): Promise<boolean> {
  let token = window.localStorage.getItem("token");

  const options = {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
    },
  };

  const data = await fetch(PDZ_URL + '/660/users/', options)
  const res = await data.json();

  if (res != 'jwt malformed') {
    return true;
  }

  return false;
}

function cleanToken() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");
}

export { authenticate, cleanToken }