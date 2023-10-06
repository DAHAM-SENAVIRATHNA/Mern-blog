import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articleContent from './articleContent';
import NotFound from './NotFound';

import Articles from '../components/Articles';
import CommentsList from '../components/Comment_list';

function Article() {
  const { name } = useParams();
  const selectedArticle = articleContent.find((article) => article.name === name);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await fetch(`/api/articles/${name}/comments`);

        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }

        const commentsData = await commentsResponse.json();
        setComments(commentsData.comments);
        setLoading(false);
      } catch (error) {
        setError('No comments');
        setLoading(false);
      }
    };

    fetchData();
    console.log('Component Mounted');
  }, [name]);

  if (!selectedArticle) {
    return <NotFound />;
  }

  const { title, thumbnail } = selectedArticle;

  return (
    <div>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>{title}</h1>
      <img src={thumbnail} alt='thumbnail' />
      {/* Render article content */}
      {selectedArticle.content.map((section, index) => (
        <div key={index}>
          <h2 className='text-xl font-bold my-2'>{section.section}</h2>
          <p className='max-auto leading-relaxed text-base mb-4'>{section.text}</p>
        </div>
      ))}
      {/* <h2 className='text-xl font-bold my-2'>Comments</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.text} - {comment.username}</li>
          ))}
        </ul>
      )} */}

      {/* import CommentsList As components */}
      <CommentsList comments={comments} loading={loading} error = {error}/>

      <h1 className='sm:text-3xl text-xl font-bold my-4 text-gray-900 mt-'>Other Articles</h1>
      <div className='flex flex-wrap -m-4'>
        <Articles articles={articleContent.filter((article) => article.name !== name)} />
      </div>
    </div>
  );
}

export default Article;
