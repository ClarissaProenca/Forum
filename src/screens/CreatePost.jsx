import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #3f51b5;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #3f51b5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #3f51b5;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #e8eaf6;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  background-color: #e8eaf6;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #3f51b5;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #303f9f;
  }
`;

export default function CreatePost({ addPost }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        description,
        date: new Date().toISOString(),
        author: "current_user", // Substitua pelo usuário atual
      };
      await addDoc(collection(db, "posts"), newPost);
      setTitle("");
      setDescription("");
      alert("Post created successfully!");
    } catch (error) {
      alert("Error creating post: " + error.message);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create a New Post</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </FormGroup>
        <Button type="submit">Create Post</Button>
      </Form>
    </FormContainer>
  );
}