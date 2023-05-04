import React from "react";

/**
 *
 * @param {string} alt  Alt text.
 * @param {string} size Indicate size of rendered
 * @param {string} src  URL of image.
 * @returns
 */
export default function ProfilePic({ alt, size = "sm", src }) {
  return (
    <img
      alt={alt}
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      src={src}
      referrerPolicy="no-referrer"
    />
  );
}
