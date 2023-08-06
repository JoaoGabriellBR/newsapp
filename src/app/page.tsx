"use client"

import Post from '@/components/Post'
import fetchNewsData from '@/services/fetchNewsData'
import { useState, useEffect } from 'react'
import { AiOutlineArrowDown } from "react-icons/ai";
import Header from '@/components/Header';

export default function Home() {

  const [newsData, setNewsData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(3);

  const handleSeeMore = () => setVisibleItems((prev: number) => prev + 3);

  const loadData = async () => {
    const response = await fetchNewsData();
    setNewsData(response?.data?.articles);
  }

  useEffect(() => {
    loadData();
  }, [])


  return (
    <>
      <Header />

      <h1 className='text-[3rem] text-center font-bold'>News App</h1>
    
      <div className='w-screen flex flex-row flex-wrap justify-center items-start bg-yellow-900'>
        <Post
          newsData={newsData}
          visibleItems={1}
          widthPost="max-w-[40rem]"
          heightPost="max-h-[96rem]"
          heightImagePost="h-96"
        />
        <Post
          newsData={newsData}
          visibleItems={1}
          widthPost = "max-w-[20rem]"
          heightPost = "max-h-[30rem]"
          heightImagePost="h-48"
        />
      </div>
      
      <div className='w-screen h-full flex flex-row flex-wrap justify-center bg-blue-800'>
        <Post
          newsData={newsData}
          visibleItems={visibleItems}
          widthPost = "max-w-[20rem]"
          heightPost = "max-h-[30rem]"
          heightImagePost="h-48"
        />
      </div>

        {newsData?.length > visibleItems && (
          <button
            onClick={handleSeeMore}
            className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white rounded-lg bg-blue-500"
          >
            Ver mais
            <AiOutlineArrowDown className="ml-1 w-[1rem] h-[1rem] font-bold" />
          </button>
        )}
    
    </>
  )
}
