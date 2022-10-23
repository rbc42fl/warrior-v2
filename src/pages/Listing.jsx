import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper';
import 'swiper/css/bundle';
////////////////
import {
  FaShare,
  FaCross,
  // FaBed,
  // FaBath,
  // FaParking,
  // FaChair,
} from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import Contact from '../components/Contact';
// import { Formik } from 'formik';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
///////////Function//////////////
export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative max-w-6xl overflow-hidden h-[400px] mx-auto"
              style={{
                background: `url(${listing.imgUrls[index]})  no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[8%] right-[15%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[20%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Posting Link Copied
        </p>
      )}
      {/* ////End of swiper ///// */}

      <div className="mx-auto flex flex-col  max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-6 ">
        <div className=" w-full h-full  ">
          <h3 className="font-semibold mb-4">My Quiet Time Gleanings</h3>
          <hr />
          <p className="mt-3 mb-3">
            <span className="font-semibold">Name : &nbsp;</span>
            {listing.name}
          </p>
          {/* un ordered list /////////// */}
          <div className="flex  justify-start items-centers space-x-4 w-[75%]">
            <p className=" w-full max-w-[200px] rounded-md p-1 text-black  font-semibold shadow-md mb-4">
              {listing.type === 'new' ? 'New' : 'Old'} Testament Book
            </p>
          </div>

          <ul className="flex flex-col mb-4 sm:flex shadow-md">
            <li className="flex items-start whitespace-nowrap  mr-4  max-w-min">
              {/* <FaCross className="text-lg mr-1" /> */}
              <span className="font-semibold whitespace-pre ">
                Book : &nbsp;
              </span>

              {listing.book}
            </li>

            <li className="flex items-center whitespace-nowrap mr-4  max-w-min">
              {/* <FaCross className="text-lg mr-1" /> */}
              <span className="font-semibold  whitespace-pre  ">
                Chapter : &nbsp;
              </span>
              {listing.chapter}
            </li>

            <li className="flex items-center whitespace-nowrap  mr-4  max-w-min">
              {/* <FaCross className="text-lg mr-1" /> */}
              <span className="font-semibold whitespace-pre">
                Verse : &nbsp;
              </span>
              {listing.verse}
            </li>
          </ul>
          <div>
            <div className="flex flex-col">
              <span className="font-semibold whitespace-pre">Commands </span>
              <textarea
                type="text"
                className=" h-36 mb-3 shadow-md  max-w-4xl  border-black"
                value={listing.command}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold whitespace-pre">Promises </span>
              <textarea
                type="text"
                className=" h-28   mb-3 shadow-md  max-w-4xl  border-black"
                value={listing.promise}
              />
            </div>
            <div className="">
              <ul className="flex flex-col shadow-md">
                <li className="flex items-center mb-3 mr-3  max-w-min">
                  {/* <FaChair className="text-lg mr-1" /> */}
                  <span className="font-semibold whitespace-pre">
                    Key Word : &nbsp;
                  </span>
                  {listing.keyword_1}
                </li>
                <li className="flex  items-center mb-3 mr-3  max-w-min">
                  {/* <FaChair className="text-lg mr-1" /> */}
                  <span className="font-semibold whitespace-pre">
                    Key Word : &nbsp;
                  </span>
                  {listing.keyword_2}
                </li>
                <li className="flex items-center mb-3  max-w-min">
                  {/* <FaChair className="text-lg mr-1" /> */}
                  <span className="font-semibold whitespace-pre">
                    Key Word: &nbsp;
                  </span>
                  {listing.keyword_3}
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold whitespace-pre">Reflections </span>
              <textarea
                type="text"
                className=" h-36   mb-8 shadow-md  max-w-4xl  border-black"
                value={listing.reflections}
              />
            </div>
          </div>

          {/* contact landlord */}
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact the Poster
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
      </div>
    </main>
  );
}
