import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

////////////////
import 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import Contact from '../components/Contact';
import styles from './Listing.module.css';
///////////Function//////////////
export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [contactLandlord, setContactLandlord] = useState(false);
  // SwiperCore.use([Autoplay, Navigation, Pagination]);

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
    <main className={styles.container}>
      <div className={styles.img_holder}>
        <img
          className={styles.posting_img}
          loading="lazy"
          src={listing.imgUrls[0]}
          alt="listingId"
        />
      </div>

      <div className={styles.posting_container}>
        <div className="w-full h-full ">
          <h3 className={styles.heading}>My Quiet Time Gleanings</h3>
          {/* <hr className={styles.main_hr} /> */}
          <p className={styles.heading}>
            <span>Name : &nbsp;</span>
            {listing.name}
          </p>
          {/* <hr className={styles.main_hr} /> */}
          {/* un ordered list /////////// */}
          <div className={styles.heading_container}>
            <p className={styles.heading}>
              {listing.type === 'new' ? 'New' : 'Old'} Testament Book
            </p>
          </div>
          <ul className={styles.List_container}>
            <li className={styles.list_item}>
              <span>Book : &nbsp;</span>
              {listing.book}
            </li>

            <li className={styles.list_item}>
              <span>Chapter : &nbsp;</span>
              {listing.chapter}
            </li>

            <li className={styles.list_item}>
              <span>Verse : &nbsp;</span>
              {listing.verse}
            </li>
          </ul>
          <div>
            <div className="flex flex-col">
              <span className={styles.heading}>
                The Primary Message From Scripture{' '}
              </span>
              <textarea
                type="text"
                className={styles.text_area}
                value={listing.message}
              />
            </div>
            <div className="flex flex-col">
              <div>
                <h3 className="font-semibold mb-4 text-center">
                  Some Key Words From My Study
                </h3>
                <hr />
              </div>

              <ul className={styles.list_container}>
                <li className="flex items-center mb-3">
                  <span s>Key Word : &nbsp;</span>
                  {listing.keyword_1}
                </li>
                <li className="flex items-center mb-3">
                  {/* <FaChair className="text-lg mr-1" /> */}
                  <span>Key Word : &nbsp;</span>
                  {listing.keyword_2}
                </li>
                <li className="flex items-center mb-">
                  {/* <FaChair className="text-lg mr-1" /> */}
                  <span>Key Word: &nbsp;</span>
                  {listing.keyword_3}
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <span className={styles.heading}>Your personal Reflections </span>
              <textarea
                type="text"
                className={styles.text_area}
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
