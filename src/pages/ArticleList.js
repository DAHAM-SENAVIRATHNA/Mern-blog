import React from 'react'
import articleContent from "./articleContent";
import { Link } from 'react-router-dom';

function ArticleList() {
    return (
        <div>
            <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>Articles</h1>
            <div className='container py-4 mx-auto'>
                <div className='flex flex-wrap -m-8'>
                    {articleContent.map((article, index) => (
                        <div key={index} className='p-4 md:w-1/2'>
                            <div className='h-full border-2 border-gray-500 border-opacity-60 rounded-lg overflow-hidden' >
                                <Link to={`/article/${article.name}`}>
                                    <img className='lg:h-48 md:h-36 w-full object-cover object-center' src={article.thumbnail} alt='Health'></img>
                                </Link>
                                <div className='p-2 ml-2'>
                                    <Link key={index} to={`/article/${article.name}`}>
                                        <h3 className='text-lg font-medium text-gray-800 mb-4'>{article.title}</h3>
                                    </Link>
                                    <p className='leading-relaxed mb-3'>
                                        {article.content[0].text.substring(0, 100)}..
                                        
                                    </p>
                                    <div className='flex items-center flex-wrap'>
                                        <Link className='text-indigo-600 inline-flex md:mb-2 lg:mb-0' to={`/article/${article.name}`}>Learn more...</Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ArticleList
