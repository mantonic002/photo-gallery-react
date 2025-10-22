import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchImage } from "../api/api";

interface JwtImgProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

function JwtImg({ src, alt = "", className, onClick }: JwtImgProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      setError("Please log in to view the image.");
      setImageUrl("");
      return;
    }

    let objectUrl: string | undefined = undefined;

    const loadImage = async () => {
      try {
        objectUrl = await fetchImage(src);
        setImageUrl(objectUrl || "");
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load image.";
        console.error("Error fetching image:", err);
        setError(errorMessage);
        setImageUrl("");
      }
    };

    loadImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src, loggedIn]);

  if (error) {
    return <div className={className}>{error}</div>;
  }

  return imageUrl ? (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      onClick={onClick}
    />
  ) : (
    <div className={className}>Loading...</div>
  );
}

export default JwtImg;
