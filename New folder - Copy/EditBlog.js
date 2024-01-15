import React, { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "blockquote","code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { 'align': [] } ,{ indent: "-1" }, { indent: "+1" },],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = ["header","bold","italic","underline","size","blockquote",'code-block',"list","bullet","indent","link","image","align","color","background"];


export default function EditBlog() {
  const {id} = useParams();
  // console.log(id)
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState("");

  useEffect(()=>{
    fetch( `http://localhost:3001/blogs/${id}`).then(res =>{
        res.json().then( postInfo =>{
          // console.log(postInfo);
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setCategory(postInfo.category)
        })
    })
},[id]);

  async function editBlog(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("id",id);
    data.set("title", title);
    data.set("content", content);
    data.set("category", category);
    if(files?.[0]){
      data.set("file",files?.[0]);
    }

    const response = await fetch("http://localhost:3001/blogs", {
      method: "PUT",
      body: data,
    });
    if(response.ok){
        alert("Blog Post Updated Successfully");
        navigate(`/blogs/${id}`);
    }
  }

  return (
  <>
    <header>
        <h1 className="mb-3 fw-bold head">Edit Blog</h1>
        <p>
          <Link to="/admin/dashboard" className="text-decoration-none">
            Back to Dashboard{" "}
          </Link>
        </p>
    </header>
    <div className="d-flex align-items-center justify-content-center blog-form">
      <form
        onSubmit={editBlog}
        className="p-lg-5 m-lg-4 p-3 container w-75"
      >
        <div>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          <input type="file" 
          accept="image/*" 
        //   value={files}
          onChange={e => setFiles(e.target.files)}
          className="form-control" />
        </div>
        <div>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={(value) => setContent(value)}
          />
        </div>
        <div>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Frontend">Front-end</option>
            <option value="Backend">Back-end</option>
            <option value="Fullstack">fullstack</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 my-3">
            Update Blog
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
