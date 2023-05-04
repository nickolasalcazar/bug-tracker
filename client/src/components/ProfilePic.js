import React from "react";

/**
 * Renders a profile picture.
 *
 * @param {string} alt  Alt text.
 * @param {string} size Indicate size of profile pic: [xs, sm, md, lg].
 * @param {string} src  URL of image.
 * @returns
 */
export default function ProfilePic({ alt, size = "xs", src }) {
  const sizes = {
    xs: "25px",
    sm: "50px",
    md: "75px",
    lg: "100px",
  };

  return (
    <img
      alt={alt}
      style={{ width: sizes[size], height: sizes[size], borderRadius: "50%" }}
      src={src}
      referrerPolicy="no-referrer"
    />
  );
}
