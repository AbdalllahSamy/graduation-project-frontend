import { axiosInstance } from '@/services/apisUrls/apisUrls';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import userImg from '../../../../assets/images/userimg.jpg';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const bgDark = 'bg-[#121212]';

  useEffect(() => {
    axiosInstance
      .get('/post') // ← Endpoint جلب البوستات
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTweet = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      title: newPostText,
      username: 'Your Name', // ← تقدر تجيبها من اليوزر الحقيقي
      handle: 'yourhandle',
      date: new Date().toLocaleDateString(),
      likes: 0,
      userImage: null,
    };

    axiosInstance
      .post('/post', newPost) // ← 🔥 حط هنا الendpoint بتاع البوست الجديد
      .then((res) => {
        // Add the new post on top of the list
        setPosts((prevPosts) => [res.data.data, ...prevPosts]);
        setNewPostText(''); // Clear textarea
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`grid grid-cols-3 gap-6 p-4 sm:p-6 ${bgDark} min-h-screen`}>
      <div className="col-span-2 flex flex-col gap-4 sm:gap-6">
        {/* إنشاء بوست جديد */}git
        <div className="p-4 border border-[#8f7517] pb-10 bg-[#1e1e1e] rounded-xl">
          <div className="flex mb-8 gap-3">
            <img
              src={userImg}
              className="w-10 h-10 rounded-full"
              alt="User Avatar"
            />
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full p-2 h-16 text-white text-lg focus:outline-none bg-transparent resize-none tracking-wide"
              placeholder="What's happening?"
            ></textarea>
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={handleTweet}
              className="bg-[#daac00] cursor-pointer hover:bg-yellow-500 rounded-full font-bold text-black px-6 py-2 flex items-center gap-2 transition"
            >
              <i className="fa-solid fa-feather-pointed"></i>
              Tweet
            </button>
          </div>
        </div>

        {/* البوستات من الAPI */}
        {posts.length > 0 &&
          posts?.map((post, index) => (
            <div
              key={index}
              className="border border-[#8f7517] p-4 cursor-pointer bg-[#1e1e1e] rounded-xl text-white"
            >
              <div className="flex items-center mb-3">
                <i className="fa-solid fa-user text-[#daac00] text-xl mr-2"></i>
                <span className="text-sm text-gray-400">New Post</span>
              </div>

              <div className="flex items-center">
                <img
                  src={post.userImage || userImg}
                  className="w-9 h-9 rounded-full"
                  alt="User Avatar"
                />
                <div className="ml-2 font-medium flex flex-shrink-0 items-center">
                  <p>
                    {post?.user?.name}
                    <span className="text-gray-400 ml-1 text-sm leading-5">
                      . {post?.user?.email}
                    </span>
                  </p>
                </div>
              </div>

              <div className="pl-12 pr-4 font-medium w-auto mt-2 space-y-4">
                <p>{post.title}</p>
                {/* عرض الصورة فقط لو موجودة */}
                {post.image && (
                  <div>
                    <img src={post.image} className="rounded-2xl" alt="Post" />
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                  <a href="#" className="flex items-center hover:text-blue-400">
                    <Heart className="w-4 h-4 mr-2" />
                    {15}
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* تريندينغ */}
      <div className="flex flex-col">
        <div className="rounded-2xl bg-[#1e1e1e] m-2 divide-y-2 divide-[#8f7517] text-white">
          <h3 className="text-white font-bold p-3 text-lg">Trendy</h3>
          {['#Palestine', '#Gaza', '#FreePalestine'].map((trend, i) => (
            <div key={i} className="p-3">
              <p className="font-bold text-white text-sm">{trend}</p>
              <span className="text-xs text-gray-400">29.7K Tweets</span>
            </div>
          ))}
          <div className="p-3">
            <p className="text-white font-bold cursor-pointer hover:underline">
              Show More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
