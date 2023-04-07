const BlogSchema = require("../models/blog_modal");
const cloudinary = require("cloudinary").v2;
const fs =require("fs")
//for blog post api

const blogModalpost = async (req, res, next) => {
  try {
    const findblog = await BlogSchema.findOne({ title: req.body.title });

    // if (findblog) {
    //   res.status(500).json({
    //     message: "Blog is already Exist !",
    //   });
    // } else {
      let url = [];
      console.log(url);
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        // const newpath = await uploader(path)
        await cloudinary.uploader.upload(path, (err, result) => {
          console.log(result?.url);
          url.push({
            img_url: result?.url,
          });
        });
        fs.unlinkSync(path)
      }

      req.body.images = url ? url : "";
      const blogSave = await BlogSchema.create(req.body);
      blogSave
        .save()
        .then((result) => {
          res.status(200).json({
            result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    //}

    //    console.log(findblog)
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const blogModalgetSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getblog = await BlogSchema.findById(id);
    const blogupdate = await BlogSchema.findByIdAndUpdate(
      id,
      {
        $inc: {
          numView: 1,
        },
      },
      { new: true }
    );
    if (getblog) {
      res.status(201).json({
        blogupdate,
      });
    } else {
      res.status(404).json({
        message: "Blog is not find",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong" + error,
    });
  }
};

// for blog update api
const blogModalupdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogs = await BlogSchema.findOneAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        numView: req.body.numView,
        isdisliked: req.body.isdisliked,
        isliked: req.body.isliked,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Blog Updated succesfully ",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong" + error,
    });
  }
};
const delete_blog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findblog = await BlogSchema.findById(id);
    if (findblog) {
      const deleted_blog = await BlogSchema.findByIdAndDelete(id);
      res.status(201).json({
        message: "Blog deleted succesfully ",
        deleted_blog,
      });
    } else {
      res.status(404).json({
        message: "Blog is not exist Please Check ! ",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong" + error,
    });
  }
};

//like blog

const bloglikes = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await BlogSchema.findById(blogId);
    //to find user log id
    const loginUserId = req.user?._id;
    //if user like the blog
    const isliked = blog?.isliked;

    //if user already disliked blog
    const alreadyDisliked = blog?.dislikes.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    console.log(loginUserId, isliked, blog?.dislikes);

    // if (alreadyDisliked) {
    //   const blog = await BlogSchema.findByIdAndUpdate(
    //     blogId,
    //     {
    //         $pull: {
    //             dislikes: loginUserId,
    //       },
    //       isdisliked: false,
    //     },
    //     { new: true }
    //   );
    //   res.status(200).json({
    //     blog,
    //   });
    // }

    if (isliked) {
      const blog = await BlogSchema.findByIdAndUpdate(
        blogId,
        {
          $pull: {
            likes: loginUserId,
          },

          isliked: false,
        },
        { new: true }
      );
      res.status(200).json({
        blog,
      });
    } else {
      const blog = await BlogSchema.findByIdAndUpdate(
        blogId,
        {
          $push: {
            likes: loginUserId,
          },
          isliked: true,
        },
        { new: true }
      );
      res.status(200).json({
        blog,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong" + error,
    });
  }
};
//dislike blog
const blogdislikes = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (blogId == undefined) {
      res.json({
        message: "Please pass blog id blog is not find !",
      });
    }
    const blog = await BlogSchema.findById(blogId);
    //to find user log id
    const loginUserId = req.user?._id;
    //if user like the blog
    const isdisliked = blog?.isdisliked;

    //if user already disliked blog
    const alreadyDisliked = blog?.dislikes.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    // if (alreadyDisliked) {
    //   const blog = await BlogSchema.findByIdAndUpdate(
    //     blogId,
    //     {
    //         $pull: {
    //             dislikes: loginUserId,
    //       },
    //       isdisliked: false,
    //     },
    //     { new: true }
    //   );
    //   res.status(200).json({
    //     blog,
    //   });
    // }

    if (isdisliked) {
      const blog = await BlogSchema.findByIdAndUpdate(
        blogId,
        {
          $pull: {
            dislikes: loginUserId,
          },

          isdisliked: false,
        },
        { new: true }
      );
      res.status(200).json({
        blog,
      });
    } else {
      const blog = await BlogSchema.findByIdAndUpdate(
        blogId,
        {
          $push: {
            dislikes: loginUserId,
          },
          isdisliked: true,
        },
        { new: true }
      );
      res.status(200).json({
        blog,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong" + error,
    });
  }
};

// for blog get api
const blogAllget = async (req, res) => {
  try {
    const blogs = await BlogSchema.find();
    res.status(201).json({
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong " + error,
    });
  }
};

module.exports = {
  blogAllget,
  blogModalpost,
  blogModalupdate,
  blogModalgetSingle,
  delete_blog,
  bloglikes,
  blogdislikes,
};
