import axios from "axios";

import { User } from "../interfaces";
import { BASE_API_URL } from "../config";

export async function login(
  phoneNumber: string,
  name: string | null
): Promise<User | null> {
  try {
    const response = await axios.post(`${BASE_API_URL}/login`, {
      phoneNumber,
      name,
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
