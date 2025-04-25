import React, { useState } from "react";
import { Navbar, Footer } from "./App";
import "./community.css";

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "How to handle online harassment?",
      author: "Jane Doe",
      time: "2 hours ago",
      content: "I recently faced online harassment, and I want to know the best way to report it...",
      replies: [],
      showReplyBox: false,
      replyText: ""
    },
    {
      id: 2,
      title: "Best fact-checking tools?",
      author: "John Smith",
      time: "5 hours ago",
      content: "What are the best fact-checking websites to verify news articles?",
      replies: [],
      showReplyBox: false,
      replyText: ""
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() === "") return;
    const newEntry = {
      id: posts.length + 1,
      title: newPost,
      author: "You",
      time: "Just now",
      content: "This is a new discussion post.",
      replies: [],
      showReplyBox: false,
      replyText: ""
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const toggleReplyBox = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, showReplyBox: !post.showReplyBox } : post
    ));
  };

  const handleReplyTextChange = (postId, text) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, replyText: text } : post
    ));
  };

  const handleReplySubmit = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId && post.replyText.trim() !== ""
        ? { ...post, replies: [...post.replies, { author: "You", text: post.replyText }], replyText: "" } 
        : post
    ));
  };

  return (
    <div className="community-forum-container">
      <Navbar />
        <header className="community-forum-header">
          <h1 className="community-forum-title">Community Forum</h1>
          <p className="community-forum-description">
            Join the discussion and share your thoughts on online safety.
          </p>
        </header>

      <div className="community-forum-content">
        <div className="community-forum-post-input">
          <textarea
            className="community-forum-textarea"
            rows="3"
            placeholder="Start a discussion..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <button className="community-forum-post-button" onClick={handlePostSubmit}>
            Post
          </button>
        </div>

        <div className="community-forum-posts">
          {posts.map((post) => (
            <div key={post.id} className="community-forum-post">
              <h2 className="community-forum-post-title">{post.title}</h2>
              <p className="community-forum-post-meta">Posted by {post.author} - {post.time}</p>
              <p className="community-forum-post-content">{post.content}</p>
              <button className="community-forum-reply-button" onClick={() => toggleReplyBox(post.id)}>
                Reply
              </button>
              {post.showReplyBox && (
                <div className="reply-box">
                  <textarea
                    className="reply-textarea"
                    rows="2"
                    placeholder="Write a reply..."
                    value={post.replyText}
                    onChange={(e) => handleReplyTextChange(post.id, e.target.value)}
                  ></textarea>
                  <button className="submit-reply-button" onClick={() => handleReplySubmit(post.id)}>
                    Submit Reply
                  </button>
                </div>
              )}
              <div className="community-forum-replies">
                {post.replies.map((reply, index) => (
                  <p key={index} className="community-forum-reply">
                    <strong>{reply.author}:</strong> {reply.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityForum;
