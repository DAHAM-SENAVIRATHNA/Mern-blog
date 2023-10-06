import React from 'react';

const CommentsList = ({ comments, loading, error }) => {
  return (
    <div>
      <h2 className='sm:text-2xl text-xl font-bold my-6 text-gray-600'>Comments:</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <div key={index}>
              <h4 className='text-xl font-bold text-blue-500 '>{comment.username}</h4>
              <p className='my-2 sm/:text-1xl'>{comment.text}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
