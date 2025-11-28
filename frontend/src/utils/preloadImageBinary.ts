const preloadImageBinary = (url: string) => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = url;
  });
};
export default preloadImageBinary;
