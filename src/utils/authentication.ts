"use client"

import useSWR from "swr";
import { PDZ_URL } from "./requests";
import Cookies from 'js-cookie'
import { useSession } from "next-auth/react"

export type user = {
  name: string | any,
  profilePicture: string | any,
}

export type pdzUser = {
  email: string,
  password: string
}

export type swrPDZUserRes = {
  data: user,
  error: any,
  isLoading: boolean
}


const fetcherWithToken = async (url: string) => {
  const token = window.localStorage.getItem("token");

  const options = {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`, // Template literal for string interpolation
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

function getUser() {
  return {
    id: '123',
    name: 'John Doe',
    profilePicture: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
  } as user
}


function useAuthenticated(session:boolean=false): boolean {

  if(session){
    return true
  }
  const data = useSWR(PDZ_URL + '/660/users/', fetcherWithToken);

  if (!data.isLoading && !data.error) {
    const result = data.data

    if (result != 'jwt malformed') {
      return true;
    }
    
  }

  return false;
}

function isAdministrator(isAuthenticated: boolean): boolean {
  if (isAuthenticated) {
    return true;
  }
  return false;
}

function cleanToken() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");
}

export { authenticate, useAuthenticated as isAuthenticated, isAdministrator, getUser, cleanToken }