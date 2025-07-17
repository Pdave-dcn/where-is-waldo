// Helper function to generate a Cloudinary thumbnail URL
export const getThumbnailUrl = (
  originalUrl: string,
  width: number,
  height: number = 0
): string => {
  if (!originalUrl || !originalUrl.includes("cloudinary.com")) {
    return originalUrl;
  }

  // Split the URL to insert transformations
  // Example: https://res.cloudinary.com/<cloud_name>/image/upload/v12345/public_id.jpg
  // We want to insert 'w_X,h_Y,c_fill,q_auto,f_auto' after '/upload/'
  const parts = originalUrl.split("/upload/");
  if (parts.length !== 2) {
    return originalUrl;
  }

  // Using c_fill for maintaining consistent dimensions in a grid
  // Using q_auto and f_auto for optimal performance and file size
  const transformation = `w_${width}${
    height > 0 ? `,h_${height}` : ""
  },c_fill,q_auto,f_auto`;

  return `${parts[0]}/upload/${transformation}/${parts[1]}`;
};
