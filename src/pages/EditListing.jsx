import { useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import {
  //addDoc,
  // collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  // const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    // type: 'rent',
    name: '',
    book: '',
    chapter: '',
    verse: '',
    verse1: '',
    verse2: '',
    message: '',
    reflections: '',
    command: '',
    promise: '',
    sin: '',
    keyword_1: '',
    keyword_2: '',
    keyword_3: '',
    images: {},
  });
  const {
    // type,
    name,
    book,
    chapter,
    verse,
    verse1,
    verse2,
    message,
    reflections,
    command,
    promise,
    sin,
    keyword_1,
    keyword_2,
    keyword_3,
    images,
  } = formData;

  const params = useParams();

  /////////// Use Effect AuthCurrentUser ///////////
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this Posting");
      navigate('/');
    }
  }, [auth.currentUser.uid, listing, navigate]);

  ///////////////////Use Effect Get The data//////////

  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      // data from firestore
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate('/');
        toast.error('Listing does not exist');
      }
    }
    fetchListing();
  }, [navigate, params.listingId]);

  function onChange(e) {
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (images.length > 6) {
      setLoading(false);
      toast.error('maximum 6 images are allowed');
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      // geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    /////// up date form data//////////
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    //delete formDataCopy.latitude;
    //delete formDataCopy.longitude;
    const docRef = doc(db, 'listings', params.listingId);

    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success('Posting Edited');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Edit Your Posting</h1>
      <form onSubmit={onSubmit}>
        <div className="flex"></div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex flex-col space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold "> Bible Book</p>
            <input
              type="text"
              id="book"
              value={book}
              onChange={onChange}
              min="1"
              max="50"
              placeholder="Book"
              required
              className="w-full px-4 py-2 text-xl text-gray-900 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 "
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Chapter</p>
            <input
              type="number"
              id="chapter"
              value={chapter}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-20 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div className="flex">
            <div className="flex flex-col w-48">
              <p className="text-lg font-semibold ">Verse</p>
              <input
                type="number"
                id="verse"
                value={verse}
                onChange={onChange}
                min="1"
                max="250"
                // placeholder="Verse"
                required
                className="w-1/2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
              />
            </div>
            <div className="flex flex-col w-48">
              <p className="text-lg font-semibold">Verse</p>
              <input
                type="number"
                id="verse1"
                value={verse1}
                onChange={onChange}
                min="1"
                max="250"
                // placeholder="Verse"
                // required
                className="w-1/2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
              />
            </div>
            <div className="flex flex-col w-48">
              <p className="text-lg font-semibold">Verse</p>
              <input
                type="number"
                id="verse2"
                value={verse2}
                onChange={onChange}
                min="1"
                max="250"
                // placeholder="Verse"
                // required
                className="w-1/2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
              />
            </div>
          </div>
        </div>

        <p className="text-lg mt-6 font-semibold">Main message of passage</p>
        <textarea
          type="text"
          id="message"
          value={message}
          onChange={onChange}
          placeholder="Message"
          required
          className="flex flex-wrap w-96 py-2 text-lg text-gray-900 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg mt-6 font-semibold">Is there a command ?</p>
        <textarea
          type="text"
          id="command"
          value={command}
          onChange={onChange}
          placeholder="Command"
          required
          className="flex flex-wrap w-96 px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg mt-6 font-semibold">Is there a promise ?</p>
        <textarea
          type="text"
          id="promise"
          value={promise}
          onChange={onChange}
          placeholder="Promise"
          required
          className="flex flex-wrap w-96 px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg mt-3 font-semibold">Is there a sin to avoid?</p>

        <textarea
          type="text"
          id="sin"
          value={sin}
          onChange={onChange}
          placeholder="Sin to avoid"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-3"
        />
        <div className="flex">
          <div className=" flex flex-col mr-3">
            <p className="  text-lg mt-6 font-semibold">Key Word </p>
            <textarea
              type="text"
              id="keyword_1"
              value={keyword_1}
              onChange={onChange}
              placeholder="Key Word"
              required
              className="  w-40 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div className=" flex flex-col mr-3">
            <p className="text-lg mt-6 font-semibold ">Key Word </p>
            <textarea
              type="text"
              id="keyword_2"
              value={keyword_2}
              onChange={onChange}
              placeholder="Key Word 2"
              required
              className="  w-40 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div>
            <p className="text-lg mt-6 font-semibold mr-3">Key Word </p>
            <textarea
              type="text"
              id="keyword_3"
              value={keyword_3}
              onChange={onChange}
              placeholder="Key Word 3"
              required
              className="  w-40 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
        </div>
        {/* ///// End key word///// */}

        <div className="flex flex-col">
          <div>
            <p className="text-lg mt-6 font-semibold">
              Your Personal Reflections
            </p>
            <textarea
              type="text"
              id="reflections"
              value={reflections}
              onChange={onChange}
              placeholder="Reflections"
              required
              className="w-full h-36 px-1 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Edit your Posting
        </button>
      </form>
    </main>
  );
}
