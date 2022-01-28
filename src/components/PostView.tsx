import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../database/appwriteService";
import { Post } from "../database/data/post";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";

export default function PostView(props: {
  appwriteService: AppwriteService;
  post: Post;
}) {
  const creator = props.post.$write[0].replace("user:", "");

  const [profilePicture, setProfilePicture] = useState<
    string | null | undefined
  >(() => {
    props.appwriteService.getUserById(creator).then(async (user) => {
      if (user == null || user.picture == null) {
        setProfilePicture(null);
        return;
      }
      try {
        const url = await props.appwriteService.getFileById(user.picture);
        setProfilePicture(url.toString());
      } catch (error) {
        setProfilePicture(null);
      }
    });
    return undefined;
  });
  const [postImage, setPostImage] = useState<string | null | undefined>(() => {
    if (props.post.image == null) {
      return null;
    } else {
      props.appwriteService
        .getFileById(props.post.image)
        .then((url) => setPostImage(url.toString()));
    }

    return undefined;
  });

  let navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="h-12 flex items-center border-b-2 border-gray-200 dark:border-gray-900">
        <ProfilePicture
          image={profilePicture !== undefined ? profilePicture : null}
        ></ProfilePicture>
        <span
          className="ml-2 cursor-pointer"
          onClick={() => navigate(`/user/${creator}`)}
        >
          {creator}
        </span>
      </div>
      <div className="m-8 flex flex-col">
        <p className="mt-0">{props.post.message}</p>
        {postImage !== undefined && postImage != null ? (
          <PostViewImage image={postImage}></PostViewImage>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
