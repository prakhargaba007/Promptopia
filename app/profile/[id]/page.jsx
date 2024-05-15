"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const [myPosts, setMyPosts] = useState([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name").toUpperCase() + "'s";

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      // console.log("name", data);
      setMyPosts(data);
    };

    if (params.id) fetchPosts();
    // console.log("name", myPosts.creator);
  }, [params.id]);

  return (
    <Profile
      name={name ? name : "My"}
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
    />
  );
};

export default MyProfile;
