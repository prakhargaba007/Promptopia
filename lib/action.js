import { useSession } from "next-auth/react";

export async function createNewPost(prevState, formData) {
  const { data: session } = useSession();
  console.log(session);
  const meal = {
    prompt: formData.get("prompt"),
    tag: formData.get("tag"),
    userId: session?.user.id,
  };

  console.log("meals", meal);

  if (isInvalidText(meal.prompt) || isInvalidText(meal.tag)) {
    return {
      message: "Invalid input.",
    };
  }

  await handleSubmitPost(meal);
  revalidatePath("/", "layout" /* , true */); // TODO: Fix this to work with getServerSideProps
  redirect("/");
}

const handleSubmitPost = async (data) => {
  try {
    const response = await fetch("/api/prompt/new", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
