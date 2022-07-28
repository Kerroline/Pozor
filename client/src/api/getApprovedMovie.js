import { HOST_API_URL } from "@/store";

export const GetApprovedMovie = async () => {
  const res = await fetch(`${HOST_API_URL}/getApprovedMovie`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const content = await res.json();
  return content.data;
};

export default GetApprovedMovie;
