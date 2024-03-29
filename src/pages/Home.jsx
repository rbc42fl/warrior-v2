import {
  collection,
  // getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
// import Slider from '../components/Slider';
import { db } from '../firebase';
import helmet from '../images/helmet.jpg';

export default function Home() {
  const [newListings, setNewListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, 'listings');
        // create the query
        const q = query(
          listingsRef,
          where('type', '==', 'new'),
          orderBy('timestamp', 'desc'),
          limit(3)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setNewListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Old testament postings//////////

  const [oldListings, setOldListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, 'listings');
        // create the query
        const q = query(
          listingsRef,
          where('type', '==', 'old'),
          orderBy('timestamp', 'desc'),
          limit(3)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setOldListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  return (
    <div>
      <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 mx-auto">
        <img src={helmet} alt="helmet" className="w-full rounded-2xl " />
      </div>

      <div className="max-w-6xl mx-auto pt-4  h-[400px]">
        {newListings && newListings.length > 0 && (
          <div className="m-2 mb-6 mt-6       ">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              New Testament Postings
            </h2>
            <Link to="/category/new">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {newListings.map(listing => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {oldListings && oldListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Old Testament Postings
            </h2>
            <Link to="/category/old">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
              {oldListings.map(listing => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
