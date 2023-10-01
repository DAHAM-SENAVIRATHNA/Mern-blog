import React from 'react';
import { useParams } from 'react-router-dom';
import articleContent from './articleContent';

function Article() {
    const { name } = useParams();
    const selectedArticle = articleContent.find((article) => article.name === name);

    if (!selectedArticle) {
        return <div>Article not found</div>;
    }

    const { title, thumbnail } = selectedArticle;

    return (
        <div>
            <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>{title}</h1>
            <img src={thumbnail} alt='thumbnail' /> {/* Use curly braces to interpolate 'thumbnail' */}
            {selectedArticle.content.map((section, index) => (
                <div key={index}>
                    <h2 className='text-xl font-bold my-2'>{section.section}</h2>
                    <p className='max-auto leading-relaxed text-base mb-4'>{section.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Article;
