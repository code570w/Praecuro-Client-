export const Config = {
  api_url:
    process.env.NODE_ENV === "production"
      ? "https://nurse-job.herokuapp.com/"
      : "http://localhost:4000/",
  salt: "b05bd5a64e9a5b1f3046bef577b81bdf",
  bucket_url: "https://personal-filestorage.s3.amazonaws.com",
};
