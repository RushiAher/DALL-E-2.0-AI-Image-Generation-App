import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils/index";
import { FormField } from "../components/index";
import { CiImageOn } from "react-icons/ci";
import "./css/style.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPromt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPromt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      
        fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        })
          .then(async (res) => {
          alert('success');
          await res.json();
          navigate("/");
        })
          .catch((error) => alert(error))
          .finally(() => setLoading(false));

      
    } else {
      alert("Please generate an image with proper details");
    }
  };
  return (
    <>
      <section className="post-container">
        <div className="post-header">
          <h1>Create</h1>
          <p>
            Create imaginative and visually stunning images through DALL-E AI
            and share them with the community.
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-container">
            <FormField
              LableName="Your name"
              type="text"
              name="name"
              placeholder="Rushi Aher"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              LableName="Prompt"
              type="text"
              name="prompt"
              placeholder="photograph of an astronaut riding a horse"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="ai-image-container">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="ai-generated-img"
                />
              ) : (
                <CiImageOn className="preview-img" />
              )}
              {generatingImg && (
                <div className="generating-img-container">Loading...</div>
              )}
            </div>
          </div>
          <div className="generate-image">
            <button type="button" onClick={generateImage}>
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="share-image">
            <p>
              Once you have created the image you want, you can share it with
              others in the community
            </p>
            <button type="submit">
              {loading ? "Sharing..." : "Share with the community"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreatePost;
